import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import { useDispatch } from 'react-redux';

import './NavSideBar.scss';

const NavSideBar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const getIsAdminPage = () => {
    if (pathname === '' || pathname === '/') {
      return true;
    }

    return false;
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <nav className='sidebar'>
      <div className='sidebar-header'>
        <a href='https://skylightphotography.co.uk/'>
          <div>SKYLIGHT PHOTOGRAPHY </div>
        </a>
      </div>
      <ul className='sidebar-menu'>
        <Link to='/' className={`sidebar-menu-item ${getIsAdminPage() ? 'active' : ''}`}>
          <img className='sidebar-menu-item-icon' alt='dashboard-icon' src='/images/dashboard.svg' />
          Dashboard
        </Link>
        <Link to='/photos' className={`sidebar-menu-item ${pathname === '/photos' ? 'active' : ''}`}>
          <img alt='photos-icon' className='sidebar-menu-item-icon' src='/images/photo.svg' />
          Photos
        </Link>
        <Link to='/collections' className={`sidebar-menu-item ${pathname === '/collections' ? 'active' : ''}`}>
          <img alt='collections-icon' className='sidebar-menu-item-icon' src='/images/collection-icon.svg' />
          Collections
        </Link>
        <Link to='/orders' alt='orders-icon' className={`sidebar-menu-item ${pathname === '/orders' ? 'active' : ''}`}>
          <img alt='orders-icon' className='sidebar-menu-item-icon' src='/images/orders.svg' />
          Orders
        </Link>
        <Link to='/users' className={`sidebar-menu-item ${pathname === '/users' ? 'active' : ''}`}>
          <img alt='users-icon' className='sidebar-menu-item-icon' src='/images/user.svg' />
          Users
        </Link>
        <button className='sidebar-menu-item sidebar-menu-item-logout' onClick={handleLogoutClick}>
          <img alt='users-icon' className='sidebar-menu-item-icon' src='/images/logout-icon.svg' />
          Logout
        </button>
      </ul>
    </nav>
  );
};

export default NavSideBar;
