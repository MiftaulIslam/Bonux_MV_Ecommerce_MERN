import { FC, useEffect, useState } from "react";
import {
  SelectOption,
  Pagination,
  PageInfo,
  TableHead,
  TableBody,
} from "../index";

import  SearchIcon  from "../icons/SearchIcon";

/**
 * A complete reusable Datatable where you need to create a json object that contains the label of heading and the column names to get the values
  * @description
  * 3 properties are mandatory 
  * @param Data - The data coming from the server
  * @param pageSizeOptions - A number of array or string of array. Helps to generate select dropdown. Coming from the parent component and sending it to the selectOption component
  * @param {(columns:any[]) => any[]} columns - A factory function that takes the data that comes from the server as an input. Returns array of objects containing information about the data which will help to generate the table header and body. 
  * Columns factory function object properties are:
  * - {string} column: Name of the data object key. Used to get the key's value, also helps to generate the table header
  * - {string} label: Specifically used to generate the table header with a custom name. 
  * - {boolean} filter: An optional property that defines whether the column is allowed to be filtered or not. 
  * - {(value:(string|number|null|boolean), row:any, data:any) =>} render: An optional function that takes the specific key's value, the specific object and the whole data source as arguments and returns a html element. Useful for adding a custom column with a custom value or html tag.

 */

const DataTable: //Property type defination
FC<{
  addFeature: any; 
  isAddModalOpen: any; 
  onAddModalOpen: any; 
  data: any[]; //The data coming from the database
  pageSizeOptions: number[] | string[]; //can be a number or a string specifying a select list optoins
  //a function that takes the data a array of objects and returns an array of objects with some nessecary properties
  columns: (data: any[]) => {
    column: string; //The key of the data object to be displayed in the table body
    label: string; //The label to be displayed in the table header
    filter?: boolean; //a boolean indicating if the column should be displayed in the filter dropdown
    /*a function that takes the value, row and the data array and returns a JSX element to be displayed in the table body cell. Useful to add a custom data to
    table body */
    render?: (value: any, row: any, data: any[]) => JSX.Element | string;
  }[];
}> = ({
  addFeature,
  isAddModalOpen,
  onAddModalOpen,
  data,
  pageSizeOptions,
  columns,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1); // Indicating the current page. Value can be changed through pagination.
  const [searchTerm, setSearchTerm] = useState<string>(""); // Contains the search value.

  //**Used to sort the data based on the specific column. Specified by clicking the column header. It will do some calculations such as comparing the column values and sort them in a order.
  const [sortedColumn, setSortedColumn] = useState<string>("");
  const [sortedDirection, setSortedDirection] = useState<any>("asc"); //Indicates the order of sorting, Initially ascending

  const [totalPages, setTotalPages] = useState<number>(1); //Number of pages of pagination.
  // Number of items to be displayed in a single page. Default value is the first item of the pageSizeOptions that coming from the parent component
  const [currentPageSize, setCurrentPageSize] = useState<string | number | any>(
    pageSizeOptions[0]
  );
  //**Filtering the data based on the pageSize, search, sort etc. Type needs to be any because of the reusable nature.
  const [filteredData, setFilteredData] = useState<any>(null);

  //**Instead of showing all of the data in a single page, minimizing the data to use the pagination behavior and maintaining a good user experience
  const startIndex = (currentPage - 1) * currentPageSize; // The index of the first item in a single page
  const endIndex = startIndex + currentPageSize; // The index of the last item in a single page

  //**Compute columns with default filter values. Set a default value for filtering. By default, a column does not have any filtering behavior. But you can override this behavior by setting filter key value to true of the column property.
  const computedColumns = columns(data)?.map((col) => ({
    ...col,
    filter: col.filter !== undefined ? col.filter : false,
  }));
  useEffect(() => {
    let filtered = data; //Storing the primary data to a temporary variable to filter

    /* Handling sorting. When ever a user clicks on a table header, it will store the column name to the storedColumn state. You already knew the behavior of useEffect hook. the useEffect again triggers and the sortedColumn state is not empty. It starts executing the block of code to sort the whole data by comparing the first row value and second row value */
    //It will compare and store to the temporary filtered variable.
    if (sortedColumn) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortedColumn]; //First item value
        const bValue = b[sortedColumn]; //Second item value
        if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.localeCompare(bValue, undefined, {
            sensitivity: "case",
          });
        } else {
          if (aValue < bValue) {
            return sortedDirection === "asc" ? -1 : 1;
          } else if (aValue > bValue) {
            return sortedDirection === "asc" ? 1 : -1;
          }
        }
        return 0;
      });
    }

    // Handling filtering
    /* When ever a user types in the search input. It will stored the value to the search term and run the useEffect hook again. Then the if block of code starts executing it will filter the filtered data again by searching the specific data that has the characters and each time it finds a match it stores the object to the filtered data variable. */
    if (searchTerm) {
      filtered = data.filter((item) =>
        Object.values(item).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Update pagination information
    const total = Math.ceil(filtered.length / currentPageSize); //Total page counter

    setTotalPages(total); //Storing to the state

    setFilteredData(filtered.slice(startIndex, endIndex)); //Storing the filtered data to the filtered state. Also minimizing the data
  }, [
    data,
    currentPage,
    searchTerm,
    sortedColumn,
    sortedDirection,
    currentPageSize,
  ]);

  return (
    <div>
      {/* Search & Page Size Utils */}
      <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full overflow-hidden bg-white shadow-lg p-2">
        <div className="flex justify-between flex-wrap gap-2">
          {/* Search Field */}
          <div className="inline-flex border rounded w-3/5 px-2 h-10 bg-transparent">
            <div className="flex flex-wrap items-center w-full relative">
              <div>
                <span className="flex items-center bg-transparent rounded rounded-r-none border border-r-0 border-none p-2 text-grey-dark text-[#5555]">
                  <SearchIcon />
                </span>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-shrink flex-grow flex-auto w-px border border-none border-l-0 rounded rounded-l-none px-3 focus:outline-none text-sm text-gray-500 font-thin"
                placeholder="Search"
              />
            </div>
          </div>

          {/* Select Options */}
          <div className="flex gap-2 px-2 items-center">
            {/* 3 Props mandatory 
                DefaultValue indicates the initial selected option
                options is an array of options to select
                onChange is a function/setState that stores the selected option value. 
                className is a string that represents the class names. 
            */}
            <SelectOption
              options={pageSizeOptions}
              onChange={setCurrentPageSize}
              className="block bg-slate-50 w-[3.5rem] h-[1.5rem] text-sm text-black border border-gray-400 rounded focus:outline-none focus:ring-2"
            />
            {addFeature && (
              <button
                onClick={() => onAddModalOpen(!isAddModalOpen)}
                className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-100"
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="align-middle inline-block w-full shadow overflow-x-auto bg-white shadow-dashboard p-2 rounded-bl-lg rounded-br-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              {/* 
              Used to generate the table headers. 4 properties are mandatory
              data = Column that contains the nesseccary informations about the column-name,label,filter,render
              sortedColumn = sortedColumn State to matched with the column name coming as a prop.
              sortedDirection = sortedDirection State to get the existing order
              onSortedColumn = a function that will be called when a column is clicked to sort the data
              onSortedDirection = a function that will be called when a column is clicked to sort the data based on a order.   
               */}
              <TableHead
                data={computedColumns}
                sortedColumn={sortedColumn}
                sortedDirection={sortedDirection}
                onSortedColumn={setSortedColumn}
                onSortedDirection={setSortedDirection}
              />
            </thead>
            <tbody className="bg-white">
              {/* Takes 2 properties
              data = The filtered Data to show in the table body
              columns = value will be the comlumn prop coming from the parent component to access the neccessary informations
               */}
              <TableBody
                filteredData={filteredData}
                data={data}
                columns={columns}
              />
            </tbody>
          </table>
        </div>

        <div className="flex-1 flex items-center w-full justify-between mt-4 work-sans">
          {/* Page Info */}
          <div>
            <PageInfo
              length={data?.length}
              startIndex={startIndex + 1}
              endIndex={endIndex}
            />
          </div>

          {/* Pagination */}
          <div>
            <Pagination
              totalPage={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(Number(page))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
