import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white w-64 p-4">
      <div className="flex flex-col md:ml-16 ml-32 items-center">
        <div className="bg-gray-700  rounded-full w-24 h-24"></div>
        <h2 className="mt-4 text-xl font-semibold">Username</h2>
        <p className="text-sm text-gray-400">user_id</p>
        <p className="text-sm">he/him</p>
        <p className="mt-2 font-semibold">Rank#123</p>
      </div>



      <div className="mt-6 ">
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <div className="bg-white w-3 h-3  rounded-full"></div>
            <span className='text-lg'>MAIT</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="bg-white w-3 h-3 rounded-full"></div>
            <span className='text-lg'>Delhi, India</span>
          </li>
        </ul>
        <div className="mt-4 space-y-2 text-lg">
          <a href="https://github.com" className="block text-blue-400">GitHub</a>
          <a href="https://linkedin.com" className="block text-blue-400">LinkedIn</a>
          <a href="https://instagram.com" className="block text-blue-400">Instagram</a>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold">Language Used</h3>
          <div className="mt-2">
            <div className="flex items-center space-x-2">
              <div className="bg-red-500 w-4 h-4 rounded-full"></div>
              <span>C++</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <div className="bg-yellow-500 w-4 h-4 rounded-full"></div>
              <span>Java</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <div className="bg-blue-500 w-4 h-4 rounded-full"></div>
              <span>Python</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
