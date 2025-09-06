// App.jsx
import React from "react";
import "./App.css";
import Navbar from "./homepage/Navbar"; // import your Navbar
import Home from "./homepage/Home";
import Predict from "./predictpage/Predict";
import Support from "./support/Support";
import Contacts from "./contact/Contacts";
import Login from "./sign/Login";
import Signup from "./sign/Signup";
import Dashboard from "./dashboard/DashB";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import { auth } from "./sign/firebase";
import { onAuthStateChanged } from "firebase/auth";

// ProtectedRoute wrapper
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />; 

  return children;
};

// Layout component with Navbar and content container
const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="app-content">
        <Outlet />
      </div>
    </>
  );
};

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/predict", element: <Predict /> },
      { path: "/support", element: <Support /> },
      { path: "/contacts", element: <Contacts /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
