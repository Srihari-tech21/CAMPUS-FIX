import React from 'react';
import { CampusProvider, useCampus } from './context/CampusContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ReportIssue from './components/ReportIssue';
import IssueDetail from './components/IssueDetail';
import MaintenanceDashboard from './components/MaintenanceDashboard';
import MyIssues from './components/MyIssues';
import AllIssues from './components/AllIssues';
import Analytics from './components/Analytics';
import NotificationsModal from './components/NotificationsModal';
import Settings from './components/Settings';
import DemoFlowBar from './components/DemoFlowBar';

function MainContent() {
  const { activeTab } = useCampus();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'report':
        return <ReportIssue />;
      case 'tracking':
        return <IssueDetail />;
      case 'maintenance':
        return <MaintenanceDashboard />;
      case 'my_issues':
        return <MyIssues />;
      case 'all_issues':
        return <AllIssues />;
      case 'analytics':
        return <Analytics />;
      case 'notifications':
        return <NotificationsModal />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-layout">
      {/* Permanent Left Glass Sidebar */}
      <Sidebar />
      
      {/* Main Content Area sitting cleanly next to sidebar */}
      <div className="main-content-area">
        <Navbar />
        <main className="page-body" style={{ paddingBottom: '5.5rem' }}>
          {renderTabContent()}
        </main>
        <DemoFlowBar />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CampusProvider>
      <MainContent />
    </CampusProvider>
  );
}
