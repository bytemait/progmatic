import React, { useState } from 'react';

const weeks = [
  ['bg-green-600', 'bg-gray-600', 'bg-gray-600', 'bg-gray-600', 'bg-gray-600', 'bg-gray-600', 'bg-gray-600'],
  ['bg-green-400', 'bg-green-500', 'bg-gray-600', 'bg-gray-600', 'bg-gray-600', 'bg-green-500', 'bg-gray-600'],
  ['bg-green-500', 'bg-green-400', 'bg-green-600', 'bg-gray-600', 'bg-green-400', 'bg-gray-600', 'bg-green-500'],
  ['bg-green-600', 'bg-gray-600', 'bg-gray-600', 'bg-gray-600', 'bg-gray-600', 'bg-green-500', 'bg-green-600'],
];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const DashboardHeader: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('August');

  return (
    <div className="p-4 bg-gray-800 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Overall Score</h4>
          <p className="text-2xl font-bold mt-2">55 points</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Total Contest</h4>
          <p className="text-2xl font-bold mt-2">33</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex flex-row items-start sm:items-center mb-4">
            <h4 className="text-lg font-semibold">Monthly Analysis</h4>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-gray-700  text-white rounded px-2 py-1 mt-2 sm:mt-0 sm:ml-4  "
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            {weeks.map((week, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center">
                <div className="text-center md:text-left md:w-16 mb-2 md:mb-0">
                  Week {index + 1}
                </div>
                <div className="flex flex-wrap justify-center md:justify-start">
                  {week.map((dayColor, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-8 h-8 ${dayColor} rounded-md m-1`}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
