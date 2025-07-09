import React from 'react';

const Pagination = ({
  totalItems,
  currentPage,
  totalPages,
  itemsPerPage,
  handleItemsPerPageChange,
  handlePageChange,
  indexOfFirstItem,
  indexOfLastItem,
}) => {
  if (totalItems === 0) return null;

  return (
    <div className="mt-0 flex md:flex-row min-w-full justify-between items-center bg-accent-teal-light p-3 text-white rounded-b-xl">
      {/* Items per page selector */}
      <div className="flex flex-row items-center gap-2 mb-3 md:mb-0 md:w-[20%]">
        <span className='w-fit'>Items/page:</span>
        <select
          className="select select-bordered select-sm bg-accent-teal-light w-fit"
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(e.target.value)}
        >
          {[5, 10, 20, 50].map((val) => (
            <option key={val} value={val}>{val}</option>
          ))}
        </select>
      </div>

      {/* Page Info */}
      <div className="hidden md:block text-sm text-gray-200 mb-3 md:mb-0">
        Showing {Math.min(totalItems, indexOfFirstItem + 1)}-{Math.min(totalItems, indexOfLastItem)} of {totalItems} questions
      </div>

      {/* Pagination Buttons */}
      <div className="join">
        <button
          className="join-item btn btn-outline btn-sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button className="join-item btn btn-outline btn-sm pointer-events-none">
          Page {currentPage} of {totalPages}
        </button>
        <button
          className="join-item btn btn-outline btn-sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
