import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './NavSideBar.scss';

const NavSideBar = () => {
  const { pathname } = useLocation();

  const getIsAdminPage = () => {
    if (pathname === '' || pathname === '/') {
      return true;
    }

    return false;
  };

  return (
    <nav className='ap-sidebar'>
      <div className='ap-sidebar-header'>
        <a href='https://skylightphotography.co.uk/'>SKYLIGHT PHOTOGRAPHY </a>
      </div>
      <ul className='ap-sidebar-menu'>
        <Link to='/' className={`ap-sidebar-menu-item ${getIsAdminPage() ? 'active' : ''}`}>
          <img className='ap-sidebar-menu-item-icon' alt='dashboard-icon' src='/images/dashboard.svg' />
          Dashboard
        </Link>
        <Link to='/photos' className={`ap-sidebar-menu-item ${pathname === '/photos' ? 'active' : ''}`}>
          <img alt='photos-icon' className='ap-sidebar-menu-item-icon' src='/images/photo.svg' />
          Photos
        </Link>
        <Link to='/collections' className={`ap-sidebar-menu-item ${pathname === '/collections' ? 'active' : ''}`}>
          <img alt='collections-icon' className='ap-sidebar-menu-item-icon' src='/images/collection-icon.svg' />
          Collections
        </Link>
        <Link
          to='/orders'
          alt='orders-icon'
          className={`ap-sidebar-menu-item ${pathname === '/orders' ? 'active' : ''}`}
        >
          <img alt='orders-icon' className='ap-sidebar-menu-item-icon' src='/images/orders.svg' />
          Orders
        </Link>
        <Link to='/users' className={`ap-sidebar-menu-item ${pathname === '/users' ? 'active' : ''}`}>
          <img alt='users-icon' className='ap-sidebar-menu-item-icon' src='/images/user.svg' />
          Users
        </Link>
      </ul>
    </nav>
  );
};

export default NavSideBar;
