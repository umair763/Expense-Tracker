import React, { useState } from 'react';
import './App.css';
import SideBar from './components/SideBar';
import MainDashBoard from './components/MainDashBoard';
import MainExpenses from './components/MainExpenses';
import MainTransaction from './components/MainTransaction';

function App() {
   const [isDashboardVisible, setIsDashboardVisible] = useState(true);
   const [isExpensesVisible, setIsExpensesVisible] = useState(false);
   const [isTransactionsVisible, setIsTransactionsVisible] = useState(false);

   const handleIsDashboardVisible = () => {
      setIsDashboardVisible(true);
      if (isExpensesVisible) setIsExpensesVisible(false);
      if (isTransactionsVisible) setIsTransactionsVisible(false);
   };

   const handleIsExpensesVisible = () => {
      setIsExpensesVisible(true);
      if (isDashboardVisible) setIsDashboardVisible(false);
      if (isTransactionsVisible) setIsTransactionsVisible(false);
   };

   const handleIsTransactionsVisible = () => {
      setIsTransactionsVisible(true);
      if (isDashboardVisible) setIsDashboardVisible(false);
      if (isExpensesVisible) setIsExpensesVisible(false);
   };

   return (
      <div className="bg-[#14181d] min-h-screen flex">
         {/* Sidebar */}
         <div className="w-52 lg:w-64">
            <SideBar
               setIsDashboardVisible={handleIsDashboardVisible}
               setIsExpensesVisible={handleIsExpensesVisible}
               setIsTransactionsVisible={handleIsTransactionsVisible}
            />
         </div>

         {/* Main Content */}
         <div className="flex-grow w-full">
            {isDashboardVisible && <MainDashBoard />}
            {isExpensesVisible && <MainExpenses />}
            {isTransactionsVisible && <MainTransaction />}
         </div>
      </div>
   );
}

export default App;
