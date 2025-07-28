import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Home from './homepage/Home'
import Predict from './predictpage/Predict'
import Support from './support/Support'
import Contacts from './contact/Contacts'
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {path: '/', element: <Home />},
  {path: '/predict', element: <Predict />},
  {path: '/support', element: <Support />},
  {path: '/contacts', element: <Contacts />}
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
