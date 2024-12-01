import { useState } from 'react';
import TransactionsRecord from './Trasactions/TransactionsRecord';
import WeeklyReportBarGraph from './Dashboard/WeeklyReportBarGraph';
import AddTransactionAndReport from './Trasactions/AddTransactionAndReport';
import TransactionGraph from './Trasactions/TransactionGraph';

const MainTransaction = (isTheme) => {
   return (
      <div className="sm:p-3 lg:p-4 w-full p-1 mt-5">
         {/* Top Section */}
         <div className="flex">
            {/* Weekly Report Bar Graph */}
            <div className="w-4/5">
               {/* <WeeklyReportBarGraph /> */}
               <TransactionGraph isTheme={isTheme} />
            </div>

            <div className="w-1/2">
               {/* Add Transaction and Report */}
               <AddTransactionAndReport />
            </div>
         </div>

         {/* Transactions Record */}
         <div className="mt-3 ">
            <TransactionsRecord />
         </div>
      </div>
   );
};

export default MainTransaction;
