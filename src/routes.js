import React, {createContext, useState} from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
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
import StudentProfile from './pages/StudentProfile';
// import { components } from 'react-select';
// import StaffProfile from './pages/StaffProfile';

// ----------------------------------------------------------------------


export const UserContext = createContext();

export default function Router() {
  // Context to share user data between components

  const [user, setUser] = useState(null);
  // Function to handle user login
  const handleLogin = (email,password) =>{
    const users=[
      {
        email:'vc@gmail.com',
        password:'vcpassword',
        role:'Vice Chancellor'
      },
      {
        email:'director@gmail.com',
        password:'directorpassword',
        role:'Director'
      },
      {
        email:'government@gmail.com',
        password:'governmentpassword',
        role:'Government'
      }
    ];

    // To check if the provided email and passowrd match any user

    const authenticaredUser = users.find((user) => user.email === email && user.password === password);

    if(authenticaredUser){
      setUser(authenticaredUser)

      localStorage.setItem('user', JSON.stringify(authenticaredUser));
      sessionStorage.setItem('user', JSON.stringify(authenticaredUser));
    }else{
      alert('Invalid email or password')
    }
  };

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'category', element: <CategoriesPage /> },
        { path: 'reporting', element: <ReportingPage /> },
        { path: 'settings', element: <SettingsPage /> },
        { path: 'profile/{row.id}', element: <StudentProfile /> },
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
    <UserContext.Provider value={user}>
      {routes}
    </UserContext.Provider>
  );
}
