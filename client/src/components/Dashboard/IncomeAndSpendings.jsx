import React from 'react';

function IncomeAndSpendings() {
   return (
      <div className="flex space-x-4">
         {/* Income Card */}
         <div className="flex flex-col items-center justify-center w-40 h-24 bg-white shadow-md rounded-lg border border-gray-200">
            <div className="flex items-center">
               {/* Wavy Line for Income */}
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="green"
                  className="w-6 h-6"
               >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c1.5-4 4.5-4 6 0s4.5 4 6 0 4.5-4 6 0" />
               </svg>
               <span className="ml-2 text-sm font-medium text-gray-500">Income</span>
            </div>
            <div className="text-xl font-bold text-gray-800">$5,700</div>
         </div>

         {/* Spending Card */}
         <div className="flex flex-col items-center justify-center w-40 h-24 bg-white shadow-md rounded-lg border border-gray-200">
            <div className="flex items-center">
               {/* Wavy Line for Spending */}
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="red"
                  className="w-6 h-6"
               >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c1.5 4 4.5 4 6 0s4.5-4 6 0 4.5 4 6 0" />
               </svg>
               <span className="ml-2 text-sm font-medium text-gray-500">Spendings</span>
            </div>
            <div className="text-xl font-bold text-gray-800">$2,254</div>
         </div>
      </div>
   );
}

export default IncomeAndSpendings;
