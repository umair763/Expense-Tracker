import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUser, FaTachometerAlt, FaWallet, FaExchangeAlt } from 'react-icons/fa';

const SideBar = () => {
   const navigate = useNavigate();
   const [user, setUser] = useState(null);
   const [activeTab, setActiveTab] = useState('dashboard');

   useEffect(() => {
      const userData = localStorage.getItem('user'); // Fetch user data from localStorage
      if (userData) {
         setUser(JSON.parse(userData)); // Set user data including image
      } else {
         fetchUserProfile();
      }
   }, []);

   const fetchUserProfile = async () => {
      try {
         const token = localStorage.getItem('token');
         if (!token) return;

         const response = await fetch('http://localhost:5000/api/users/profile', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user)); // Store user data in localStorage
         }
      } catch (error) {
         console.error('Error fetching user profile:', error);
      }
   };

   const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
   };

   const handleTabClick = (tab, path) => {
      setActiveTab(tab);
      navigate(path);
   };

   return (
      <div className="h-full flex flex-col justify-between bg-[#5586a5] text-slate-950 dark:text-white dark:bg-slate-800">
         <div className="flex flex-col items-center mt-8">
            <div className="relative w-20 h-20 mb-2 overflow-hidden rounded-full">
               {user && user.image ? (
                  <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400">
                     <FaUser size={32} />
                  </div>
               )}
            </div>
            <h2 className="text-sm sm:text-md lg:text-lg font-semibold">{user?.name || 'User'}</h2>
            <h2 className="text-xs sm:text-sm lg:text-md text-gray-300 break-all text-center w-full px-2 ">
               {user?.email || 'Guest@gmail.com'}
            </h2>
         </div>

         <div className="flex flex-col items-start mt-8 space-y-4 px-2 bg-[#417696] dark:bg-slate-700 p-2 m-3 h-1/2 rounded-lg">
            <button
               className={`w-full flex items-center py-2 px-2 rounded justify-start text-left ${
                  activeTab === 'dashboard'
                     ? 'bg-[#4783a8] dark:bg-slate-600'
                     : 'hover:bg-[#4783a8] dark:hover:bg-slate-600'
               }`}
               onClick={() => handleTabClick('dashboard', '/dashboard')}
            >
               <FaTachometerAlt className="mr-4" size={16} />
               <span className="flex-grow text-sm sm:text-base lg:text-lg">Dashboard</span>
            </button>
            <button
               className={`w-full flex items-center py-2 px-2 rounded justify-start text-left ${
                  activeTab === 'expenses'
                     ? 'bg-[#4783a8] dark:bg-slate-600'
                     : 'hover:bg-[#4783a8] dark:hover:bg-slate-600'
               }`}
               onClick={() => handleTabClick('expenses', '/expenses')}
            >
               <FaWallet className="mr-4" size={16} />
               <span className="flex-grow text-sm sm:text-base lg:text-lg">Expenses</span>
            </button>
            <button
               className={`w-full flex items-center py-2 px-2 rounded justify-start text-left ${
                  activeTab === 'transactions'
                     ? 'bg-[#4783a8] dark:bg-slate-600'
                     : 'hover:bg-[#4783a8] dark:hover:bg-slate-600'
               }`}
               onClick={() => handleTabClick('transactions', '/transactions')}
            >
               <FaExchangeAlt className="mr-4" size={16} />
               <span className="flex-grow text-sm sm:text-base lg:text-lg">Transactions</span>
            </button>
         </div>

         {/* Sign Out Button */}
         <div className="flex flex-col items-start p-4">
            <button
               className="w-full flex items-center py-2 px-2 hover:bg-red-400 bg-red-300 text-red-700 rounded justify-start text-left"
               onClick={handleLogout}
            >
               <FaSignOutAlt className="mr-4" size={20} />
               <span className="flex-grow text-sm sm:text-base lg:text-lg">Sign Out</span>
            </button>
         </div>
      </div>
   );
};

export default SideBar;
