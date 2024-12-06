import React, { useState, useEffect } from 'react';
import './App.css';
import SideBar from './components/SideBar';
import MainDashBoard from './components/MainDashBoard';
import MainExpenses from './components/MainExpenses';
import MainTransaction from './components/MainTransaction';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './components/ThemeContext';
import Login from './components/LoginRegisteration/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registeration from './components/LoginRegisteration/Registeration';

function App() {
   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
   const [isDashboardVisible, setIsDashboardVisible] = useState(true);
   const [isExpensesVisible, setIsExpensesVisible] = useState(false);
   const [isTransactionsVisible, setIsTransactionsVisible] = useState(false);
   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 500);
   const [isTheme, setIsTheme] = useState(false);
   const [isLogin, setIsLogin] = useState(false);

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

   const handleIsTheme = (isDark) => {
      setIsTheme(isDark);
   };

   return (
      <BrowserRouter>
         {isLogin ? (
            <Routes>
               <Route path="/" element={<Login setLogin={setIsLogin} />} />
               <Route path="/register" element={<Registeration />} />
            </Routes>
         ) : (
            <ThemeProvider>
               <div className="main-container dark:bg-[#162029]">
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

                  {/* Top Navigation */}
                  <div
                     style={{
                        marginLeft: isSidebarVisible ? '90px' : window.innerWidth > 650 ? '260px' : '90px',
                     }}
                     className="backdrop-blur-xl h-10 flex items-center justify-between text-black fixed left-0 right-0 z-50 px-4 md:px-8"
                  >
                     {/* Toggling Button */}
                     <div
                        style={{ position: 'absolute', marginLeft: '-85px' }}
                        className="toggle-btn bg-[#417696] text-slate-950 dark:text-white dark:bg-slate-700 -mt-3 p-1 rounded-md"
                     >
                        <button className="focus:outline-none focus:ring-0 border-none" onClick={toggleSidebar}>
                           <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="M4 6h16M4 12h16m-7 6h7"
                              />
                           </svg>
                        </button>
                     </div>

                     {/* Welcome Message (Small Screens) */}
                     {isSmallScreen && (
                        <div className="-ml-4 text-xs font-semibold text-black dark:text-white">
                           <h1>Welcome, User</h1>
                        </div>
                     )}

                     {/* Theme Toggle */}
                     <div className="absolute right-4 z-50">
                        <ThemeToggle setISTheme={handleIsTheme} />
                     </div>
                  </div>

                  {/* Main Content */}
                  <div className="w-full md:w-11/12 lg:w-11/12 overflow-y-auto">
                     {isDashboardVisible && <MainDashBoard isTheme={isTheme} />}
                     {isExpensesVisible && <MainExpenses />}
                     {isTransactionsVisible && <MainTransaction isTheme={isTheme} />}
                  </div>
               </div>
            </ThemeProvider>
         )}
      </BrowserRouter>
   );
}

export default App;
