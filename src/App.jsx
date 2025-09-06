import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./homepage/Home";
import Predict from "./predictpage/Predict";
import Support from "./support/Support";
import Contacts from "./contact/Contacts";
import Login from "./sign/Login";
import Signup from "./sign/Signup";
import Dashboard from "./dashboard/DashB";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { auth } from "./sign/firebase";
import { onAuthStateChanged } from "firebase/auth";

// ProtectedRoute wrapper
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />; // redirect if not logged in

  return children;
};

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/predict",
    element: (
      <ProtectedRoute>
        <Predict />
      </ProtectedRoute>
    ),
  },
  {
    path: "/support",
    element: (
      <ProtectedRoute>
        <Support />
      </ProtectedRoute>
    ),
  },
  {
    path: "/contacts",
    element: (
      <ProtectedRoute>
        <Contacts />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
