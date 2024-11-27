import { useState } from 'react';
import TransactionsRecord from './Trasactions/TransactionsRecord';
import WeeklyReportBarGraph from './Dashboard/WeeklyReportBarGraph';
import AddTransactionAndReport from './Trasactions/AddTransactionAndReport';

const MainTransaction = () => {
   return (
      <div className="mt-8 p-4 sm:p-3 lg:p-4">
         {/* Top Section */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Weekly Report Bar Graph */}
            <div className=" rounded-lg shadow-md">
               <WeeklyReportBarGraph />
            </div>

            {/* Add Transaction and Report */}
            <AddTransactionAndReport />
         </div>

         {/* Transactions Record */}
         <div className="mt-3">
            <TransactionsRecord />
         </div>
      </div>
   );
};

export default MainTransaction;
