import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionRecord = () => {
   const [transactions, setTransactions] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   // Fetch transactions data with pagination
   const fetchTransactions = async (page) => {
      setLoading(true);
      setError(null);
      try {
         // Get the authentication token
         const token = localStorage.getItem('token');

         if (!token) {
            setError('You need to be logged in to view transactions.');
            setLoading(false);
            return;
         }

         console.log('Fetching transactions with token:', token); // Debugging

         // Include the token in the request headers
         const response = await axios.get(`http://localhost:5000/api/transactions?page=${page}&limit=10`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         const data = response.data;
         console.log('Fetched transactions data:', data); // Log the fetched data

         setTransactions(data.transactions);
         setTotalPages(data.totalPages);
      } catch (error) {
         console.error('Error fetching transactions:', error);
         setError('Failed to load transactions. Please try again.');
      } finally {
         setLoading(false);
      }
   };

   // Handle page change
   const handlePageChange = (page) => {
      setCurrentPage(page);
      fetchTransactions(page);
   };

   // Refresh transactions after adding a new one
   const refreshTransactions = () => {
      fetchTransactions(currentPage);
   };

   useEffect(() => {
      fetchTransactions(currentPage);
   }, [currentPage]);

   return (
      <div className="p-2 -ml-2 bg-slate-200 text-black dark:bg-[#00203FFF] dark:text-white min-h-screen">
         {/* Error Display */}
         {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
               <p>{error}</p>
            </div>
         )}

         {/* Filters Section */}
         <div className="flex flex-wrap items-center gap-4 mb-6">
            <select className="dark:bg-slate-700 focus:outline-none dark:border-slate-700 border border-gray-300 rounded-lg p-2 w-full md:w-1/6">
               <option>Status</option>
               <option>Successful</option>
               <option>Failed</option>
            </select>
            <input
               type="text"
               placeholder="Transaction ID"
               className="dark:bg-slate-700 focus:outline-none dark:border-slate-700 border border-gray-300 rounded-lg p-2 w-full md:w-1/6"
            />
            <input
               type="date"
               className="dark:bg-slate-700 focus:outline-none dark:border-slate-700 border border-gray-300 rounded-lg p-2 w-full md:w-1/6"
            />
            <button className="bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700">Search</button>
         </div>

         {/* Transactions Table */}
         <div className="bg-slate-300 text-black dark:bg-[#123150] dark:text-white rounded-lg shadow-md overflow-x-auto text-sm">
            <table className="table-auto w-full text-left border-collapse">
               <thead className="bg-gray-400 dark:bg-[#1e4368] text-sm uppercase">
                  <tr>
                     <th className="p-4">Transaction ID</th>
                     <th className="p-4">Date</th>
                     <th className="p-4">Time</th>
                     <th className="p-4">Transaction Type</th>
                     <th className="p-4">Amount</th>
                     <th className="p-4">Status</th>
                     <th className="p-4">Discount</th>
                     <th className="p-4">Fee/Charge</th>
                     <th className="p-4">Depository Institute</th>
                     <th className="p-4">Description</th>
                  </tr>
               </thead>
               <tbody>
                  {loading ? (
                     <tr>
                        <td colSpan="10" className="text-center py-4">
                           Loading...
                        </td>
                     </tr>
                  ) : transactions.length > 0 ? (
                     transactions.map((transaction, index) => (
                        <tr
                           key={transaction._id || index}
                           className="border-b hover:bg-slate-400 dark:hover:bg-[#204972]"
                        >
                           <td className="p-4">{transaction.id}</td>
                           <td className="p-4">{transaction.date}</td>
                           <td className="p-4">{transaction.time}</td>
                           <td className="p-4">{transaction.type}</td>
                           <td className="p-4">{transaction.amount}</td>
                           <td className="p-4">
                              <span
                                 className={`px-2 py-1 rounded-lg text-white ${
                                    transaction.status === 'Successful' ? 'bg-green-600' : 'bg-red-600'
                                 }`}
                              >
                                 {transaction.status}
                              </span>
                           </td>
                           <td className="p-4">{transaction.discount} %</td>
                           <td className="p-4">{transaction.fee_charge}</td>
                           <td className="p-4">{transaction.depository_institution}</td>
                           <td className="p-4">{transaction.description}</td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan="10" className="text-center py-4">
                           No transactions found
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>

         {/* Pagination */}
         {transactions.length > 0 && (
            <div className="flex justify-between items-center gap-4 mt-4">
               <p className="text-gray-400 text-sm">
                  {`Showing ${(currentPage - 1) * 10 + 1}-${Math.min(currentPage * 10, transactions.length)} of ${
                     transactions.length
                  } transactions`}
               </p>
               <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                     <button
                        key={i}
                        className={`px-3 py-1 rounded-lg text-sm ${
                           currentPage === i + 1
                              ? 'bg-purple-600 text-white hover:bg-purple-700'
                              : 'bg-purple-300 text-white hover:bg-purple-400'
                        }`}
                        onClick={() => handlePageChange(i + 1)}
                     >
                        {i + 1}
                     </button>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

export default TransactionRecord;
