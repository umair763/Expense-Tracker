import React, { useState, useEffect } from 'react';

function ExpensesRecord() {
   const [expenses, setExpenses] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   const recordsPerPage = 10;

   // Fetch the user's expenses from the server
   useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
         console.error('No token found in localStorage.');
         setError('You need to be logged in.');
         return;
      }

      const fetchExpenses = async () => {
         try {
            setIsLoading(true);
            const response = await fetch('http://localhost:5000/api/expenses', {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });

            if (!response.ok) {
               throw new Error('Failed to fetch expenses');
            }

            const data = await response.json();
            console.log('Fetched expenses data:', data); // Log the fetched data

            setExpenses(data); // Update state with fetched expenses
         } catch (err) {
            setError(err.message || 'Failed to fetch expenses');
         } finally {
            setIsLoading(false);
         }
      };

      fetchExpenses();
   }, []);

   // Handle page change
   const handlePageChange = (page) => {
      setCurrentPage(page);
   };

   // Calculate the pagination
   const totalPages = Math.ceil(expenses.length / recordsPerPage);
   const currentRecords = expenses.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

   if (isLoading) {
      return <div>Loading expenses...</div>;
   }

   if (error) {
      return <div>{error}</div>;
   }

   return (
      <div className="p-4 bg-slate-200 text-black dark:bg-[#00203FFF] dark:text-white">
         <h1 className="text-2xl sm:text-3xl font-bold mb-4">Expenses</h1>

         {/* Responsive Table */}
         <div className="overflow-x-auto">
            <table className="min-w-full border-collapse table-auto text-sm">
               <thead>
                  <tr className="text-left border-b border-slate-800 text-xs sm:text-sm lg:text-md p-0 m-0">
                     <th className="py-3 px-2 sm:px-4">Item</th>
                     <th className="py-3 px-2 sm:px-4">Category</th>
                     <th className="py-3 px-2 sm:px-4">Amount</th>
                     <th className="py-3 px-2 sm:px-4">Recorded Date</th>
                  </tr>
               </thead>
               <tbody>
                  {currentRecords.length === 0 ? (
                     <tr>
                        <td colSpan="4" className="text-center py-3 px-2 sm:px-4">
                           No expenses found.
                        </td>
                     </tr>
                  ) : (
                     currentRecords.map((record, index) => (
                        <tr
                           key={index}
                           className="border-b border-gray-800 hover:bg-gray-300 dark:hover:bg-[#0c2742] text-xs sm:text-sm lg:text-md"
                        >
                           <td className="py-3 px-2 sm:px-4">{record.item}</td>
                           <td className="py-3 px-2 sm:px-4">{record.category}</td>
                           <td className="py-3 px-2 sm:px-4 text-red-500 font-semibold">{record.amount}</td>
                           <td className="py-3 px-2 sm:px-4">{record.recordedDate}</td>
                        </tr>
                     ))
                  )}
               </tbody>
            </table>
         </div>

         {/* Pagination */}
         <div className="flex flex-col sm:flex-row items-center justify-between mt-4 space-y-2 sm:space-y-0">
            <p className="text-gray-400 text-sm">
               {`1-${Math.min(currentPage * recordsPerPage, expenses.length)} out of ${expenses.length} total`}
            </p>
            <div className="flex items-center space-x-2">
               {Array.from({ length: totalPages }, (_, i) => (
                  <button
                     key={i}
                     className={`px-3 py-1 text-sm rounded ${
                        currentPage === i + 1 ? 'bg-yellow-500 text-black' : 'bg-gray-400 hover:bg-gray-500'
                     }`}
                     onClick={() => handlePageChange(i + 1)}
                  >
                     {i + 1}
                  </button>
               ))}
            </div>
         </div>
      </div>
   );
}

export default ExpensesRecord;
