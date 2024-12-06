import React, { useState } from 'react';
import Registeration from './Registeration';
import GoogleSignIn from './GoogleSignIn';
import { useNavigate } from 'react-router-dom';

function Login({ setLogin }) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
         });

         const data = await response.json();

         if (response.ok) {
            console.log('Login successful:', data); // Debugging
            localStorage.setItem('token', data.token); // Save token to local storage
            setLogin(true);
            navigate('/dashboard'); // Redirect after login
         } else {
            console.log('Login failed:', data); // Debugging
            setError(data.message || 'Failed to login. Try again.');
         }
      } catch (err) {
         console.error('Error during login request:', err); // Debugging
         setError('Something went wrong. Please try again.');
      }
   };

   return (
      <div
         className="flex items-center justify-center min-h-screen bg-gradient-to-b bg-cover bg-center"
         style={{ backgroundImage: 'url(./src/assets/loginBG-2.jpg)' }}
      >
         <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 w-96">
            <h2 className="text-white text-2xl font-bold text-center mb-6">Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
               <div className="mb-4">
                  <input
                     type="text"
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full py-2 px-4 bg-white/20 text-white placeholder-gray-300 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
               </div>
               <div className="mb-4">
                  <input
                     type="password"
                     placeholder="Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full py-2 px-4 bg-white/20 text-white placeholder-gray-300 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
               </div>
               <button
                  type="submit"
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
            <p className="text-center text-gray-300 mt-6">
               Don't have an account?{' '}
               <button onClick={() => navigate('/register')} className="text-purple-400 hover:underline">
                  SIGN UP
               </button>
            </p>
         </div>
      </div>
   );
}

export default Login;
