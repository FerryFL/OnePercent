import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProgressContextProvider } from './context/ProgressContext';
import { ReviewContextProvider } from './context/ReviewContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <AuthContextProvider>
      <ProgressContextProvider>
        <ReviewContextProvider>
          <App />
        </ReviewContextProvider>
      </ProgressContextProvider>
    </AuthContextProvider>
  // </React.StrictMode>
);

