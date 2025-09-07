import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './views/Dashboard';
import Patients from './views/Patients';
import Appointments from './views/Appointments';
import Messages from './views/Messages';
import VideoCalls from './views/VideoCalls';
import Schedule from './views/Schedule';
import Wallet from './views/Wallet';
import Documents from './views/Documents';
import Profile from './views/Profile';
import Settings from './views/Settings';

interface ProviderDashboardProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
  onProfileView: (type: string, id: string) => void;
}

const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ 
  currentView, 
  onViewChange, 
  onLogout, 
  onProfileView 
}) => {
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onViewChange={onViewChange} />;
      case 'patients':
        return <Patients onProfileView={onProfileView} />;
      case 'appointments':
        return <Appointments onProfileView={onProfileView} />;
      case 'messages':
        return <Messages />;
      case 'video-calls':
        return <VideoCalls />;
      case 'wallet':
        return <Wallet />;
      case 'documents':
        return <Documents />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen animated-bg">
      <Sidebar currentView={currentView} onViewChange={onViewChange} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ProviderDashboard;