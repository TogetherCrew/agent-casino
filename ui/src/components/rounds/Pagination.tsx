import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export const Pagination = ({ totalItems, itemsPerPage, onPageChange }: { totalItems: number, itemsPerPage: number, onPageChange: (page: number) => void }) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const [page, setPage] = useState(0);

  const handlePageChange = (page: number) => {
    console.log('Pagination.handlePageChange', page);
    setPage(page);
    onPageChange(page);
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        <span className="text-sm">
          Page {page + 1} of {pageCount}
        </span>
      </div>
      <div className="flex gap-2 justify-center mt-4 text-md">
        <button
          onClick={() => handlePageChange(0)}
          className="px-4 py-2 rounded-full bg-black text-white hover:opacity-80"
          disabled={pageCount === 0}
        >
          <ChevronDoubleLeftIcon className="w-4 h-4" />
        </button>
        {pageCount > 0 && (
          <>
            <button
              onClick={() => handlePageChange(page - 1)}
              className="px-4 py-2 rounded-full bg-black text-white hover:opacity-80"
              disabled={page < 1}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="px-4 py-2 rounded-full bg-black text-white hover:opacity-80"
              disabled={page >= pageCount - 1}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => handlePageChange(pageCount - 1)}
              className="px-4 py-2 rounded-full bg-black text-white hover:opacity-80"
            >
              <ChevronDoubleRightIcon className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div >
  )
}

