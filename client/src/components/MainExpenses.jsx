import React from 'react';
import ExpensesRecord from './Expenses/ExpensesRecord';
import MonthlyReportBarGraph from './Dashboard/MonthlyReportBarGraph';
import WeeklyReportBarGraph from './Dashboard/WeeklyReportBarGraph';
import TrackFinance from './Dashboard/TrackFinance';
import AddExpenseAndReport from './Expenses/AddExpenseAndReport';
import Categories from './Dashboard/Catagories';

function MainExpenses() {
   return (
      <div className="flex flex-col md:flex-row gap-6 mt-10 ">
         {/* Left Column */}
         <div className="flex-grow ">
            <ExpensesRecord />
            <AddExpenseAndReport />
         </div>

         {/* Right Column */}
         <div className="flex-1 space-y-6 overflow-hidden mr-4">
            <div>
               <TrackFinance />
            </div>
            <div>
               {/* <MonthlyReportBarGraph /> */}
               <Categories />
            </div>
         </div>
      </div>
   );
}

export default MainExpenses;
