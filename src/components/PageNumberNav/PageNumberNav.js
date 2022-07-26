import React, { useState, useEffect } from 'react';

import './PageNumberNav.scss';

const PageNumberNav = ({ maxPage, activePage, setActivePage }) => {
  //Since a max of 5 page numbers will be shown, this will initially centre the active page
  const [viewStartingPage, setViewStartingPage] = useState(1);

  //Effect to update which page number the list begins with when activePage is updated
  useEffect(() => {
    //Will stop starting page being set so that page numbers begin with 0 or lower
    if (activePage < 3) {
      setViewStartingPage(1);
      return;
    }
    //Stop starting page being set such that the 5th page number will exceed maximum possible page
    if (activePage > maxPage - 3) {
      setViewStartingPage(maxPage - 4);
      return;
    }

    setViewStartingPage(activePage - 2);
  }, [activePage, maxPage]);

  const smartSetActivePage = (newPageNum) => {
    //Checks if activePage is within valid range, if not sets it to 1;
    if (activePage < 0 || activePage > maxPage) {
      setActivePage(1);
    }

    //Will stop further logic if trying to change page to one outside valid range
    if (newPageNum < 1 || newPageNum > maxPage) {
      return;
    }

    setActivePage(newPageNum);
  };

  const getPageNumElement = (pageNum) => {
    const isActivePage = pageNum === activePage ? 'active' : '';

    return (
      <div key={pageNum} className={`pageNumNav-pageNum ${isActivePage}`} onClick={() => smartSetActivePage(pageNum)}>
        {pageNum}
      </div>
    );
  };

  if (!maxPage) {
    return null;
  }

  if (maxPage <= 5) {
    const pageButtons = [];

    for (let i = 1; i <= maxPage; i++) {
      pageButtons.push(getPageNumElement(i));
    }

    return pageButtons;
  }

  const getPageButtonsForWhenGreaterThan5Pages = () => {
    const pageButtons = [];
    for (let i = viewStartingPage; i < viewStartingPage + 5; i++) {
      pageButtons.push(getPageNumElement(i));
    }
    return pageButtons;
  };

  const previousPageButton = (
    <button
      className='pagNav-previous-button'
      onClick={() => {
        smartSetActivePage(activePage - 1);
      }}
    >
      Previous
    </button>
  );

  const nextPageButton = (
    <button
      className='pagNav-next-button'
      onClick={() => {
        smartSetActivePage(activePage + 1);
      }}
    >
      Next
    </button>
  );

  return [previousPageButton, getPageButtonsForWhenGreaterThan5Pages(), nextPageButton];
};

export default PageNumberNav;
