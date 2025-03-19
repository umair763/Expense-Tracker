import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleSignIn({ setLogin }) {
   const handleLoginSuccess = async (response) => {
      try {
         const { credential } = response;

         // Send Google token to backend
         const res = await axios.post('http://localhost:5000/api/users/google-signin', { token: credential });

         // Store JWT Token in Local Storage
         localStorage.setItem('token', res.data.token);
         setLogin(true);

         console.log('Google Sign-In successful:', res.data);
      } catch (error) {
         console.error('Google Sign-In failed:', error.response?.data?.message || error.message);
      }
   };

   const handleLoginFailure = (error) => {
      console.error('Google Sign-In failed:', error);
   };

   return (
      <div className="pt-2">
         <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
      </div>
   );
}

export default GoogleSignIn;
