import React, { useState } from 'react';
import './App.css';
import SideBar from './components/SideBar';
import MainDashBoard from './components/MainDashBoard';
import MainExpenses from './components/MainExpenses';
import MainTransaction from './components/MainTransaction';

function App() {
   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
   const [isDashboardVisible, setIsDashboardVisible] = useState(true);
   const [isExpensesVisible, setIsExpensesVisible] = useState(false);
   const [isTransactionsVisible, setIsTransactionsVisible] = useState(false);

   // Toggle sidebar visibility
   const toggleSidebar = () => {
      setIsSidebarVisible(!isSidebarVisible);
   };

   const handleIsDashboardVisible = () => {
      setIsDashboardVisible(true);
      setIsExpensesVisible(false);
      setIsTransactionsVisible(false);
   };

   const handleIsExpensesVisible = () => {
      setIsDashboardVisible(false);
      setIsExpensesVisible(true);
      setIsTransactionsVisible(false);
   };

   const handleIsTransactionsVisible = () => {
      setIsDashboardVisible(false);
      setIsExpensesVisible(false);
      setIsTransactionsVisible(true);
   };

   return (
      <div className="main-container">
         {/* Sidebar */}
         <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
            <SideBar
               setIsDashboardVisible={handleIsDashboardVisible}
               setIsExpensesVisible={handleIsExpensesVisible}
               setIsTransactionsVisible={handleIsTransactionsVisible}
            />
         </div>

         {/* Toggling Button */}
         <div className="absolute top-2 left-4 z-50 bg-slate-700 p-1 rounded-lg">
            <button className="text-white focus:outline-none" onClick={toggleSidebar}>
               <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
               </svg>
            </button>
         </div>

         {/* Main Content */}
         <div className="content">
            {isDashboardVisible && <MainDashBoard />}
            {isExpensesVisible && <MainExpenses />}
            {isTransactionsVisible && <MainTransaction />}
         </div>
      </div>
   );
}

export default App;
