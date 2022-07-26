import NavSideBar from '../../components/NavSideBar/NavSideBar';
import DashboardSummaryWidgets from '../../components/DashboardSummaryWidget/DashboardSummaryWidget';
import RecentOrdersWidget from '../../components/RecentOrdersWidget/RecentOrdersWidget';
import './DashboardPage.scss';

const DashboardPage = () => {
  return (
    <>
      <NavSideBar />
      <section className='panel-page'>
        <div className='panel-page-inner'>
          <div className='dashboard-main-summary-row'>
            <DashboardSummaryWidgets />
          </div>
          <RecentOrdersWidget />
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
