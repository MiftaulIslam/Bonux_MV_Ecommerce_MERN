import { FC } from 'react'
import SortAscendingIcon from '../icons/SortAscendingIcon'
import  SortDescendingIcon from '../icons/SortDescendingIcon';
/**
 * Dynamic data table header generator. 
 * @description 
 * Takes the data as an input and generates headers based on the data. 
 * Takes four properties:
 * @param {Array<object>} data - Array of objects containing the data coming from the server.
 * @param {string} sortedColumn - A state variable specifying the column name to sort. Calculation are included in the parent component.
 * @param {(e: string)=>void} onSortedColumn - A state updater function of sorted Column. When ever an user clicks on a table header, it stores
 * the column name to the sortedColumn state and starts sorting the whole data again. Returns the column name and saves it to the sortedColumn state.
 * @param {string} sortedDirection - A state variable specifying the order to sort the data.
 * @param {(e: string)=>void} onSortedDirection - A state updater function of sortedDirection. Used to change the sort direction. Returns the new sort direction.
 */

const TableHead:FC<{
  data: any[];
  sortedColumn: string | null;
  sortedDirection: "asc" | "desc";
  onSortedColumn: (column: string) => void;
  onSortedDirection: (direction: string) => void;
}> = ({data, sortedColumn, sortedDirection, onSortedColumn, onSortedDirection}) => {
  return (
    <tr>
                {data?.map((col, index) => (
                  <th
                    key={index}
                    className="p-2 border-b-2 cursor-pointer hover:bg-slate-200 duration-200 border-gray-300 text-left text-blue-400"
                    onClick={() => {
                      if (col.column && col.filter) {
                        const direction =
                          sortedColumn === col.column && sortedDirection === "asc"
                            ? "desc"
                            : "asc";
                            onSortedColumn(col.column);
                            onSortedDirection(direction);
                      }
                    }}
                  >
                    <div className="flex justify-between items-center">
                      {col.label.toString().toUpperCase()}
                      {sortedColumn === col.column && (
                        <span className="w-[20px] text-gray-600">
                          {sortedDirection === "asc" ? (
                            <SortAscendingIcon />
                          ) : (
                            <SortDescendingIcon />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
  )
}

export default TableHead