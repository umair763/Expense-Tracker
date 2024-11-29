import React, { useState, useEffect } from 'react';

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
   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 500);

   useEffect(() => {
      const handleResize = () => setIsSmallScreen(window.innerWidth <= 500);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

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
      <div className="main-container ">
         {/* Sidebar */}
         <div className="md:w-1/3 lg:w-1/5">
            <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
               <SideBar
                  setIsDashboardVisible={handleIsDashboardVisible}
                  setIsExpensesVisible={handleIsExpensesVisible}
                  setIsTransactionsVisible={handleIsTransactionsVisible}
               />
            </div>
         </div>
         {/* Toggling Button */}
         <div className="toggle-btn">
            <button className="text-white focus:outline-none" onClick={toggleSidebar}>
               <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
               </svg>
            </button>
         </div>

         {/* Main Content */}
         <div className="w-full md:w-11/12 lg:w-11/12 overflow-y-auto">
            {isSmallScreen && (
               <div className="mt-5 ml-24 pd-4 text-white">
                  <h1>Welcome, Muhammad Umair</h1>
               </div>
            )}
            {isDashboardVisible && <MainDashBoard />}
            {isExpensesVisible && <MainExpenses />}
            {isTransactionsVisible && <MainTransaction />}
         </div>
      </div>
   );
}

export default App;
