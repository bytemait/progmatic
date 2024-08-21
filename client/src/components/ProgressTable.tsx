import React, { useState } from 'react';

type ContestData = {
  contestCode: string;
  contestName: string;
  pointsScored: number;
  rank: number;
};

type ProgressTableProps = {
  data: ContestData[];
};

const ITEMS_PER_PAGE = 5;

const ProgressTable: React.FC<ProgressTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4 bg-gray-800 text-white  rounded-lg mt-4">
      <h4 className="text-lg font-semibold mb-2">Progress</h4>
      
      {/* Wrapping table in a scrollable container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[400px]">
          <thead>
            <tr>
              <th className="py-2">Contest Code</th>
              <th className="py-2">Contest Name</th>
              <th className="py-2">Points Scored</th>
              <th className="py-2">Rank</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((contest, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="py-2">{contest.contestCode}</td>
                <td className="py-2">{contest.contestName}</td>
                <td className="py-2">{contest.pointsScored}</td>
                <td className="py-2">{contest.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Buttons */}
      <div className="flex justify-center sm:justify-end mt-4 space-x-2 flex-wrap">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`bg-gray-700 px-3 py-1 rounded ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`bg-gray-700 px-3 py-1 rounded ${
              currentPage === index + 1 ? 'bg-gray-600' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`bg-gray-700 px-3 py-1 rounded ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProgressTable;
