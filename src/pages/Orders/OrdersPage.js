import React, { useEffect, useState } from 'react';

import { getOrders } from '../../api/adminApi';
import NavSideBar from '../../components/NavSideBar/NavSideBar';
import PageNumberNav from '../../components/PageNumberNav/PageNumberNav';
import ModalParent from '../../components/ModalParent/ModalParent';
import OrderDetailsModal from '../../components/OrderDetailsModal/OrderDetailsModal';

import './OrdersPage.scss';

const OrdersPage = () => {
  const [orders, setOrders] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [orderDetailsModal, setOrderDetailsModal] = useState({ isOpen: false, orderId: null });

  const closeOrderDetailsModal = () => {
    setOrderDetailsModal({ isOpen: false, orderId: null });
  };

  useEffect(() => {
    const updatePhotos = async () => {
      try {
        const { orders, pageCount } = await getOrders(activePage, 8);
        setTotalPages(pageCount);
        setOrders(orders);
      } catch (error) {
        console.error(error);
      }
    };

    updatePhotos();
  }, [activePage]);

  const renderTableRows = () => {
    if (!orders) {
      return null;
    }

    return orders.map((order) => {
      const [creationDate, creationTime] = order.createdAt.split('.')[0].split('T');

      return (
        <tr className='card-table-row' key={order.id}>
          {/* <td className='text-center'>
            <img className='admin-page-photo-preview' src={photo.imageWmarkedMedSquarePublicURL} />
          </td> */}
          <td className='card-table-cell text-center'>#{order.id}</td>
          <td className='card-table-cell text-center'>{order.customerName}</td>
          <td className='card-table-cell text-center'>
            {creationTime} {creationDate.split('-').join('/')}
          </td>
          <td className='card-table-cell text-center'>£{order.totalPriceInPence / 100}</td>
          <td className='card-table-cell text-center'>
            <button
              className='table-button details-button'
              onClick={() => {
                setOrderDetailsModal({ isOpen: true, orderId: order.id });
              }}
            >
              Details
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <NavSideBar />
      {orderDetailsModal.isOpen && (
        <ModalParent closeModal={closeOrderDetailsModal}>
          <OrderDetailsModal closeModal={closeOrderDetailsModal} orderId={orderDetailsModal.orderId} />
        </ModalParent>
      )}
      <div className='panel-page'>
        <div className='panel-page-inner'>
          <div className='card-table-container card'>
            <div className='card-table-header'>Orders</div>
            <table>
              <thead>
                <tr>
                  <th className='card-table-cell card-table-header-cell'>Order #</th>
                  <th className='card-table-cell card-table-header-cell'>Name</th>
                  <th className='card-table-cell card-table-header-cell'>Date</th>
                  <th className='card-table-cell card-table-header-cell'>Total</th>
                  <th className='card-table-cell card-table-header-cell'>Actions</th>
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
            <div className='card-table-footer'>
              <div className='card-table-page-buttons'>
                <PageNumberNav activePage={activePage} setActivePage={setActivePage} maxPage={totalPages} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
