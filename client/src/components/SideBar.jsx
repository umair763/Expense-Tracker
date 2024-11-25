import React from 'react';
import { FaTachometerAlt, FaWallet, FaExchangeAlt, FaSignOutAlt } from 'react-icons/fa';

function SideBar({ setIsDashboardVisible, setIsExpensesVisible, setIsTransactionsVisible }) {
   return (
      <div className="h-full flex flex-col justify-between bg-gray-800 text-white">
         {/* Top Section */}
         <div className="flex flex-col items-center mt-8">
            <img
               src="./src/images/peakpx.jpg"
               alt="Profile"
               className="w-24 h-24 rounded-full border-4 border-yellow-400"
            />
            <h2 className="mt-4 text-lg font-semibold">Muhammad Umair</h2>
         </div>

         {/* Navigation */}
         <div className="flex flex-col items-start mt-8 space-y-4 px-2 bg-slate-700 p-2 m-3 h-1/2 rounded-lg">
            <button
               className="w-full flex items-center py-2 px-2 hover:bg-gray-600 rounded"
               onClick={setIsDashboardVisible}
            >
               <FaTachometerAlt className="mr-4" size={16} />
               Dashboard
            </button>
            <button
               className="w-full flex items-center py-2 px-2 hover:bg-gray-600 rounded"
               onClick={setIsExpensesVisible}
            >
               <FaWallet className="mr-4" size={16} />
               Expenses
            </button>
            <button
               className="w-full flex items-center py-2 px-2 hover:bg-gray-600 rounded"
               onClick={setIsTransactionsVisible}
            >
               <FaExchangeAlt className="mr-4" size={16} />
               Transactions
            </button>
         </div>

         {/* Logout */}
         <div className="flex flex-col items-start p-4">
            <button className="w-full flex items-center py-2 px-2 hover:bg-red-700 text-red-500 rounded">
               <FaSignOutAlt className="mr-4" size={20} />
               Sign Out
            </button>
         </div>
      </div>
   );
}

export default SideBar;

// function SideBar({ setIsDashboardVisible, setIsExpensesVisible, setIsTransactionsVisible }) {
//    return (
//       <>
//          <div className="sidebar">
//             <div className="h-full w-full lg:w-64 bg-gray-800 text-white flex flex-col justify-between">
//                {/*  Top Section  */}
//                <div className="flex flex-col items-center mt-8">
//                   <img
//                      src="./src/images/peakpx.jpg"
//                      alt="Profile"
//                      className="w-24 h-24 rounded-full border-4 border-yellow-400"
//                   />
//                   <h2 className="mt-4 pl-3 text-lg font-semibold">Muhammad Umair</h2>
//                </div>

//                {/* Center Section: Options */}
//                <div className="flex flex-col items-start mt-8 space-y-4 px-2 bg-slate-700 p-2 m-3 h-1/2 rounded-lg">
//                   <button
//                      className="w-full flex items-center py-2 px-2 hover:bg-gray-600 rounded flex-col sm:flex-row"
//                      onClick={() => setIsDashboardVisible(true)}
//                   >
//                      <FaTachometerAlt className="mr-0 sm:mr-4 mb-2 sm:mb-0" size={16} />
//                      <span className="text-sm sm:text-base text-center sm:text-left">Dashboard</span>
//                   </button>
//                   <button
//                      className="w-full flex items-center py-2 px-2 hover:bg-gray-600 rounded flex-col sm:flex-row"
//                      onClick={() => setIsExpensesVisible(true)}
//                   >
//                      <FaWallet className="mr-0 sm:mr-4 mb-2 sm:mb-0" size={16} />
//                      <span className="text-sm sm:text-base text-center sm:text-left">Expenses</span>
//                   </button>
//                   <button
//                      className="w-full flex items-center py-2 px-2 hover:bg-gray-600 rounded flex-col sm:flex-row"
//                      onClick={() => setIsTransactionsVisible(true)}
//                   >
//                      <FaExchangeAlt className="mr-0 sm:mr-4 mb-2 sm:mb-0" size={16} />
//                      <span className="text-sm sm:text-base text-center sm:text-left">Transactions</span>
//                   </button>
//                </div>

//                {/* Bottom Section: Signout */}
//                <div className="flex flex-col items-start p-1 space-y-4 px-4 bg-slate-700 m-3 h-auto rounded-lg">
//                   <button className="w-full flex items-center py-2 px-2 hover:bg-red-700 text-red-500 rounded">
//                      <FaSignOutAlt className="mr-4" size={20} />
//                      Sign Out
//                   </button>
//                </div>
//             </div>
//          </div>
//       </>
//    );
// }
