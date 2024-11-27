import React from 'react';
import { FaFileInvoiceDollar, FaChartPie } from 'react-icons/fa';

const AddExpenseAndReport = () => {
   return (
      <>
         <div className="p-6 bg-gray-900 rounded-md text-white w-full">
            <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
            <div className="flex justify-center w-full">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                  {/* New Expense Button */}
                  <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition">
                     <div className="w-10 h-10 flex items-center justify-center text-white rounded-full bg-pink-600 mr-4">
                        <FaFileInvoiceDollar />
                     </div>
                     <span className="text-sm font-medium">+ New expense</span>
                  </div>

                  {/* Create Report Button */}
                  <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition">
                     <div className="w-10 h-10 flex items-center justify-center text-white rounded-full bg-teal-600 mr-4">
                        <FaChartPie />
                     </div>
                     <span className="text-sm font-medium">+ Create report</span>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default AddExpenseAndReport;
