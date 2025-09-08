import React, { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth.tsx';
import LoginScreen from './components/LoginScreen';
import ProviderDashboard from './components/ProviderDashboard';
import PatientProfile from './components/profiles/PatientProfile';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedProfile, setSelectedProfile] = useState<{type: string, id: string} | null>(null);


  const handleProfileView = (type: string, id: string) => {
    setSelectedProfile({ type, id });
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setSelectedProfile(null); // Clear profile when navigating to main views
  };

  return (
    <AuthProvider>
      <AppContent 
        currentView={currentView}
        onViewChange={handleViewChange}
        selectedProfile={selectedProfile}
        setSelectedProfile={setSelectedProfile}
        onProfileView={handleProfileView}
      />
    </AuthProvider>
  );
}

const AppContent: React.FC<{
  currentView: string;
  onViewChange: (view: string) => void;
  selectedProfile: {type: string, id: string} | null;
  setSelectedProfile: (profile: {type: string, id: string} | null) => void;
  onProfileView: (type: string, id: string) => void;
}> = ({ currentView, onViewChange, selectedProfile, setSelectedProfile, onProfileView }) => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setSelectedProfile(null);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => {}} />;
    }

  if (selectedProfile?.type === 'patient') {
    return (
      <PatientProfile 
        patientId={selectedProfile.id} 
        onBack={() => setSelectedProfile(null)} 
        onLogout={handleLogout}
        currentView={currentView}
        onViewChange={onViewChange}
      />
    );
  }

  return (
    <ProviderDashboard 
      currentView={currentView}
      onViewChange={onViewChange}
      onLogout={handleLogout}
      onProfileView={onProfileView}
    />
  );
};

export default App;