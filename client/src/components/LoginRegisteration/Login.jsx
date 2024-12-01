// src/components/Login.jsx
import React, { useState } from 'react';
import Registeration from './Registeration';
import GoogleSignIn from './GoogleSignIn';
import { useNavigate } from 'react-router-dom';

function Login() {
   const [isRegistered, setIsRegistered] = useState(false);
   const navigate = useNavigate();

   const handlesubmit = () => async (e) => {
      e.preventDefault();
   };
   return (
      <>
         {isRegistered ? (
            <Registeration />
         ) : (
            <div
               className="flex items-center justify-center min-h-screen bg-gradient-to-b bg-cover bg-center"
               style={{ backgroundImage: 'url(./src/assets/loginBG-2.jpg)' }}
            >
               <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 w-96">
                  <h2 className="text-white text-2xl font-bold text-center mb-6">Login</h2>
                  <form>
                     {/* Username/Email Field */}
                     <div className="mb-4">
                        <label className="sr-only" htmlFor="username">
                           Username or Email
                        </label>
                        <div className="relative">
                           <input
                              type="text"
                              id="username"
                              placeholder="Username or Email"
                              className="w-full py-2 px-4 bg-white/20 text-white placeholder-gray-300 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                           />
                           <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                              <i className="fas fa-user"></i>
                           </span>
                        </div>
                     </div>

                     {/* Password Field */}
                     <div className="mb-4">
                        <label className="sr-only" htmlFor="password">
                           Password
                        </label>
                        <div className="relative">
                           <input
                              type="password"
                              id="password"
                              placeholder="Password"
                              className="w-full py-2 px-4 bg-white/20 text-white placeholder-gray-300 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                           />
                           <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                              <i className="fas fa-lock"></i>
                           </span>
                        </div>
                     </div>

                     {/* Remember Me and Forgot Password */}
                     {/* <div className="flex items-center justify-between mb-6">
                  <label className="flex items-center text-gray-300">
                     <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-purple-500 border-gray-500 focus:ring-0"
                     />
                     <span className="ml-2">Remember me</span>
                  </label>
                  <a href="#" className="text-purple-400 hover:underline">
                     Forgot Password?
                  </a>
               </div> */}

                     {/* Login Button */}
                     <button
                        type="submit"
                        onClick={() => handlesubmit}
                        className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                     >
                        LOGIN
                     </button>
                  </form>
                  <div className="w-full bg-white mt-6" style={{ height: '1px' }}></div>
                  <div className="mt-2 mb-4 text-center text-white">Continue As</div>
                  <div>
                     <GoogleSignIn />
                  </div>

                  {/* Signup Link */}
                  <p className="text-center text-gray-300 mt-6">
                     Don't have an account?{' '}
                     <button onClick={() => navigate('/register')} className="text-purple-400 hover:underline">
                        SIGN UP
                     </button>
                  </p>
               </div>
            </div>
         )}
      </>
   );
}

export default Login;
