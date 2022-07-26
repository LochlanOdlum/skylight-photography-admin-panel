import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginPage from './pages/Login/LoginPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import OrdersPage from './pages/Orders/OrdersPage';
import UsersPage from './pages/Users/UsersPage';
import CollectionsPage from './pages/Collections/CollectionsPage';
import PhotosPage from './pages/Photos/PhotosPage';

import './assets/styles/global.scss';

const ProtectedLoginRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <LoginPage />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedLoginRoute />}>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/orders' element={<OrdersPage />} />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/collections' element={<CollectionsPage />} />
          <Route path='/photos' element={<PhotosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
