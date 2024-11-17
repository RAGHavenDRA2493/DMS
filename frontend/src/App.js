import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Auth from './components/Auth';
import UploadDocument from './components/UploadDocument';
import DocumentList from './components/DocumentList';
import Navbar from './components/Navbar'; // Import the Navbar component

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
  },
  {
    path: '/upload',
    element: (
      <>
        <Navbar />
        <UploadDocument />
      </>
    ),
  },
  {
    path: '/documents',
    element: (
      <>
        <Navbar />
        <DocumentList />
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;