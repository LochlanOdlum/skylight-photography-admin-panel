import React, { useState, useEffect } from 'react';

import SummaryWidget from '../SummaryWidget/SummaryWidget';
import { getSummaryDetails } from '../../api/adminApi';

const DashboardSummaryWidgets = () => {
  const [summaryData, setSummaryData] = useState(null);

  console.log(summaryData);

  useEffect(() => {
    const getSummaryData = async () => {
      const { summaryDetails: data } = await getSummaryDetails();
      setSummaryData(data);
    };

    getSummaryData();
  }, []);

  return (
    <>
      <SummaryWidget
        heading={'Total Orders'}
        subheading='All time orders'
        value={summaryData ? summaryData.orderCount : ''}
      />
      <SummaryWidget
        heading={'Revenue'}
        subheading='Total revenue'
        value={summaryData ? `£${summaryData?.totalRevenue / 100}` : ''}
      />
      <SummaryWidget
        heading={'Total Users'}
        subheading='Signed up users'
        value={summaryData ? summaryData.userCount : ''}
      />
    </>
  );
};

export default DashboardSummaryWidgets;
