import React from 'react';
import { FaTachometerAlt, FaWallet, FaExchangeAlt, FaSignOutAlt } from 'react-icons/fa';

function SideBar() {
   return (
      <div className="h-screen w-64 bg-gray-800 text-white flex flex-col justify-between">
         {/* Top Section */}
         <div className="flex flex-col items-center mt-8">
            <img
               src="./src/images/peakpx.jpg"
               alt="Profile"
               className="w-24 h-24 rounded-full border-4 border-yellow-400"
            />
            <h2 className="mt-4 text-lg font-semibold">Muhammad Umair</h2>
         </div>

         {/* Center Section: Options */}
         <div className="flex flex-col items-start mt-8 space-y-4 px-4 bg-slate-700 p-4 m-3 h-screen rounded-lg">
            <button className="w-full flex items-center py-2 px-2 hover:bg-gray-600 rounded">
               <FaTachometerAlt className="mr-4" size={20} />
               Dashboard
            </button>
            <button className="w-full flex items-center py-2 px-2 hover:bg-gray-600 rounded">
               <FaWallet className="mr-4" size={20} />
               Expenses
            </button>
            <button className="w-full flex items-center py-2 px-2 hover:bg-gray-600 rounded">
               <FaExchangeAlt className="mr-4" size={20} />
               Transactions
            </button>
         </div>

         {/* Bottom Section: Signout */}
         <div className="mb-4 px-4">
            <button className="w-full flex items-center py-2 px-2 hover:bg-red-700 text-red-500 rounded">
               <FaSignOutAlt className="mr-4" size={20} />
               Sign Out
            </button>
         </div>
      </div>
   );
}

export default SideBar;
