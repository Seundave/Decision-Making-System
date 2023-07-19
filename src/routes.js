import React, {createContext, useState} from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import { Alert, Snackbar } from '@mui/material';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LogOut from './pages/LogOut';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import CategoriesPage from './pages/CategoriesPage';
import ReportingPage from './pages/ReportingPage';
import SettingsPage from './pages/SettingsPage';
import StudentPage from './pages/StudentProfile';
import StaffPage from './pages/StaffProfile';

// import { components } from 'react-select';
// import StaffProfile from './pages/StaffProfile';

// ----------------------------------------------------------------------

 const AuthContext = createContext();
export const userContext = createContext(null);

export default function Router() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const users = [
    { email: 'vc@gmail.com', role: 'VC', password: 'vpassword' },
    { email: 'director@gmail.com', role: 'director', password: 'dpassword' },
    { email: 'government@gmail.com', role: 'government', password: 'gpassword' },
    // Add more users here as needed
  ];

  const handleLogin = (email, password) => {
    // Check if email or password is blank
    if (email.trim() === '' || password.trim() === '') {
      console.log('Please enter both email and password.');
      setLoginError('Please enter both email and password.')
      return;
    }

    // Check if email format is correct
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoginError('Invalid email format.')
      console.log('Invalid email format.');
      return;
    }

    // Find the user with matching email
    const user = users.find(user => user.email === email);

    if (!user) {
      console.log('Email not found.');
      return;
    }

    // Check if user exists and password matches
    if (user && user.password === password) {
      setCurrentUser(user);
      // navigate('/dashboard', { replace: true });
      setLoginError(null);
      console.log('Login successful!');
      console.log(user)
      return true;
    } else {
      setLoginError('Invalid password.');
      console.log(' Invalid password')
      return;
    }
  };

//   if (user) {
//     if (user.password === password) {
//       setCurrentUser(user);
//       console.log('Login successful!');
//     } else {
//       console.log('Incorrect password.');
//     }
//   } else {
//     console.log('Email not found.');
//   }
// };

  
  
  

 

    // To check if the provided email and passowrd match any user


  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        // { path: 'category', element: <CategoriesPage /> },
        { path: 'reporting', element: <ReportingPage /> },
        { path: 'settings', element: <SettingsPage /> },
        { path: 'category/student', element: <StudentPage /> },
        { path: 'category/staff', element: <StaffPage /> },
        // { path: 'staff', element: <StaffProfile /> }
        // { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: '/',
      element: <LoginPage />,
      children:[
        {element: <Navigate to="/" />, index: true }
      ]
    },
    {
      path: 'logout',
      element: <LogOut />,
    },
    {
      path: 'category',
      element: <CategoriesPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return (
    <AuthContext.Provider value={{ loginError, currentUser, setCurrentUser, setLoginError, handleLogin, users }}>
      {routes}
    </AuthContext.Provider>
  );
}

export {AuthContext}