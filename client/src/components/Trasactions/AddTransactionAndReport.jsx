import { React, useState } from 'react';
import { FaPlus, FaFileAlt } from 'react-icons/fa';
import AddTransactionForm from './AddTransactionForm';

const AddTransactionAndReport = () => {
   const [isAddTransactionVisible, setIsAddTransactionVisible] = useState(false);

   // Toggle the visibility of the AddTransactionForm
   const HandleToggleAddTransaction = () => {
      setIsAddTransactionVisible((prev) => !prev); // Automatically toggles the previous state
   };

   return (
      <div className="p-6 bg-gray-900 rounded-md text-white w-full font-poppins">
         <h2 className="text-lg sm:text-xl font-semibold mb-4">Quick Actions</h2>
         <div className="flex justify-center w-full">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 w-full">
               {/* Add New Transaction Button */}
               <button
                  className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer"
                  onClick={HandleToggleAddTransaction} // Toggle visibility
               >
                  <div className="w-12 h-12 flex items-center justify-center text-white rounded-full bg-blue-600 mr-4">
                     <FaPlus className="text-lg sm:text-xl" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">+ Add Transaction</span>
               </button>

               {/* View Transaction Report Button */}
               <button className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer">
                  <div className="w-12 h-12 flex items-center justify-center text-white rounded-full bg-green-600 mr-4">
                     <FaFileAlt className="text-lg sm:text-xl" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">View Reports</span>
               </button>
            </div>
         </div>
         {isAddTransactionVisible && <AddTransactionForm onClose={HandleToggleAddTransaction} />}
      </div>
   );
};

export default AddTransactionAndReport;
