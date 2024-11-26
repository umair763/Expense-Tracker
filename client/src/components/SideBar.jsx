import React from 'react';
import { FaTachometerAlt, FaWallet, FaExchangeAlt, FaSignOutAlt } from 'react-icons/fa';

function SideBar({ setIsDashboardVisible, setIsExpensesVisible, setIsTransactionsVisible }) {
   return (
      <div className="h-full flex flex-col justify-between bg-gray-800 text-white">
         {/* Top Section */}
         <div className="flex flex-col items-center mt-8 sidebar-expanded:hidden">
            <img
               src="./src/images/peakpx.jpg"
               alt="Profile"
               className="w-24 h-24 rounded-full border-4 border-yellow-400 hidden sm:block"
            />
            <h2 className="mt-4 text-lg font-semibold hidden sm:block">Muhammad Umair</h2>
         </div>

         {/* Navigation */}
         <div className="flex flex-col items-start  mt-8 space-y-4 px-2 bg-slate-700 p-2 m-3 h-1/2 rounded-lg">
            <button
               className="w-full flex items-center py-2 px-2 hover:bg-gray-600 rounded justify-start text-left"
               onClick={setIsDashboardVisible}
            >
               <FaTachometerAlt className="mr-4" size={16} />
               <span className="flex-grow">Dashboard</span>
            </button>
            <button
               className="w-full flex items-center py-2 px-2 hover:bg-gray-600 rounded justify-start text-left"
               onClick={setIsExpensesVisible}
            >
               <FaWallet className="mr-4" size={16} />
               <span className="flex-grow">Expenses</span>
            </button>
            <button
               className="w-full flex items-center py-2 px-2 hover:bg-gray-600 rounded justify-start text-left"
               onClick={setIsTransactionsVisible}
            >
               <FaExchangeAlt className="mr-4" size={16} />
               <span className="flex-grow">Transactions</span>
            </button>
         </div>

         {/* Logout */}
         <div className="flex flex-col items-start p-4">
            <button className="w-full flex items-center py-2 px-2 hover:bg-red-700 text-red-500 rounded justify-start text-left">
               <FaSignOutAlt className="mr-4" size={20} />
               <span className="flex-grow">Sign Out</span>
            </button>
         </div>
      </div>
   );
}

export default SideBar;
