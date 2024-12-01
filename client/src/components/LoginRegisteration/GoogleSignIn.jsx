import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const GoogleSignIn = () => {
   const onSuccess = (credentialResponse) => {
      // Handle successful sign-in
      console.log(credentialResponse);
   };

   const onFailure = (error) => {
      // Handle sign-in failure
      console.error(error);
   };

   return (
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
         <GoogleLogin onSuccess={onSuccess} onFailure={onFailure} />
      </GoogleOAuthProvider>
   );
};

export default GoogleSignIn;
