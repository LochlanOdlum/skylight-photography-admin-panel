import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { getRecentOrders } from '../../api/adminApi';

import './RecentOrdersWidget.scss';

const RecentOrdersWidget = () => {
  const [recentOrders, setRecentOrders] = useState(null);

  console.log(recentOrders);

  useEffect(() => {
    const getSetRecentOrders = async () => {
      const { recentOrders: orders } = await getRecentOrders();

      setRecentOrders(orders);
    };

    getSetRecentOrders();
  }, []);

  const renderTableRows = () => {
    if (!recentOrders) {
      console.log('t');
      return null;
    }
    console.log('p');

    return recentOrders.map((order) => {
      const [creationDate, creationTime] = order.createdAt.split('.')[0].split('T');

      return (
        <tr className='card-table-row'>
          <td className='card-table-cell text-center'>#{order.id}</td>
          <td className='card-table-cell text-center'>
            {/* <div className='admin-table-cell-name-wrapper '> */}
            {/* <img src='/images/user.png' alt='user-icon' className='admin-table-cell-user-icon'></img> */}
            {order.customerName}
            {/* </div> */}
          </td>
          <td className='card-table-cell text-center'>
            {creationTime} {creationDate}
          </td>
          <td className='card-table-cell text-center'>£{order.totalPriceInPence / 100}</td>
          <td className='card-table-cell text-center'>
            {/* <button className='admin-table-details-button'>Details</button> */}
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className='card-table-container card'>
        <div className='card-table-header'>Recent Orders</div>
        <table>
          <thead>
            <tr>
              <th className='card-table-cell'>#</th>
              <th className='card-table-cell'>Name</th>
              <th className='card-table-cell'>Date</th>
              <th className='card-table-cell'>Total</th>
              {/* <th className='admin-table-cell'>Actions</th> */}
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
        <div className='card-table-footer'>
          <div className='card-table-footer-link'>
            <Link to='/orders'>{'All Orders >'}</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentOrdersWidget;
