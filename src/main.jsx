import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/routes.jsx';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
