import { FC } from 'react';
import { LeftArrow, RightArrow } from '../icons';

/**
 * A dynamic pagination component. Useful in DataTables
 * @description
 * Takes three properties
 * - totalPage: Number of pages needed. Coming from the parent component
 * - currentPage: A state variable that represents the current page. 
 * 
 * @param {(e:number) => void} onPageChange - A state updater function of currentPage. Called to change the current page
 */
const Pagination:FC<{
  totalPage: number;
  currentPage: number;
  onPageChange: (page: (number)) => void;
}> = ({ totalPage, currentPage, onPageChange }) => {

  //Format of pagination. 
  const getPaginationNumbers = () => {
    let pages = [];
    if (totalPage <= 3) {
      pages = Array.from({ length: totalPage }, (_, i) => i + 1);
    } else {
      if (currentPage <= 2) {
        pages = [1, 2, 3, "..."];
      } else if (currentPage >= totalPage - 1) {
        pages = [1, "...", totalPage - 1, totalPage];
      } else {
        pages = [1, "...", currentPage, "...", totalPage];
      }
    }
    return pages;
  };

  return (
    <nav className="relative z-0 inline-flex shadow-sm">
    {/* Previous left Button */}
    <div>
      <button
        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
        aria-label="Previous"
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
      >
        <LeftArrow />
      </button>
    </div>

    {/* Pagination Numbers */}
    <div>
      
<nav className="relative z-0 inline-flex shadow-sm">
{getPaginationNumbers().map((page, i) =>
page === "..." ? (
<span
  key={i}
  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500"
>
  {page}
</span>
) : (
<button
  key={i}
  className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium ${
    page == currentPage
      ? "text-blue-700 text-[21px] bg-gray-500"
      : "text-blue-700"
  } focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-50 transition ease-in-out duration-150`}
  onClick={() => onPageChange(page)}
>
  {page}
</button>
)
)}
</nav>
    
    </div>

    {/* Pagination right */}
    <div>
      <button
        className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
        aria-label="Next"
        disabled={currentPage === totalPage}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
      >
        <RightArrow />
      </button>
    </div>
  </nav>
  );
};

export default Pagination;
