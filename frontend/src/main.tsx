import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import Router from './router';
import { AuthProvider } from './contexts/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="703970357034-ht9pcug4faakuvn330ll3mltalvoeck1.apps.googleusercontent.com">
      <AuthProvider>
        <Router />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
