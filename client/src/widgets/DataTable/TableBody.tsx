import { FC } from 'react';

/**
 * Dynamic data table body generator. Useful for datatable.
 * @description
 * Takes data as input to get the key's value. Columns property helps to generate the body by getting the specific key's value. Takes two properties:
 * 
 * @param {any[]} data - Array of objects containing the data coming from the server.
 * @param {(columns:any[]) => any[]} columns - A factory function that takes the data that comes from the server as an input. Returns array of objects containing information about the data which will help to generate the table header and body.
 * 
 * Columns factory function object properties are:
 * - {string} column: Name of the data object key. Used to get the key's value, also helps to generate the table header
 * - {string} label: Specifically used to generate the table header with a custom name. 
 * - {boolean} filter: An optional property that defines whether the column is allowed to be filtered or not. 
 * - {(value:(string|number|null|boolean), row:any, data:any) =>} render: An optional function that takes the specific key's value, the specific object and the whole data source as arguments and returns a html element. Useful for adding a custom column with a custom value or html tag.  
 */
const TableBody: FC<{ 
  filteredData: any[],
  data: any[],
  columns: (data: any[]) => {
    column: string;
    label: string;
    filter?: boolean;
    render?: (value: (string|number|null|boolean), row: any, data: any[]) => JSX.Element | string;
  }[];
}> = ({ filteredData, data, columns }) => {
  if (!filteredData || filteredData.length === 0) {
    return (
      <tr className=" border-gray-500">
        <td colSpan={columns(data).length} className="py-4 px-2 text-center text-gray-500">
          No data found
        </td>
      </tr>
    );
  }

  return (
    <>
      {filteredData.map((item: any, rowIndex: number) => (
        <tr className="border-b border-gray-500" key={rowIndex}>
          {columns(data).map((col, colIndex) => {
            const value = item[col.column];
            return (
              <td
                key={colIndex}
                className="py-4 px-2 whitespace-no-wrap text-blue-900 text-sm"
              >
                {col.render
                  ? col.render(value, item, data)
                  : value}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
};

export default TableBody;
