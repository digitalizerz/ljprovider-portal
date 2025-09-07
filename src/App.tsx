import React, { useState } from 'react';
import { AuthProvider } from './hooks/useAuth.tsx';
import LoginScreen from './components/LoginScreen';
import ProviderDashboard from './components/ProviderDashboard';
import PatientProfile from './components/profiles/PatientProfile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedProfile, setSelectedProfile] = useState<{type: string, id: string} | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
    setSelectedProfile(null);
  };

  const handleProfileView = (type: string, id: string) => {
    setSelectedProfile({ type, id });
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setSelectedProfile(null); // Clear profile when navigating to main views
  };

  const renderContent = () => {
    // Add your content rendering logic here
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (selectedProfile) {
    if (selectedProfile.type === 'patient') {
      return (
        <AuthProvider>
          <PatientProfile 
            patientId={selectedProfile.id} 
            onBack={() => setSelectedProfile(null)} 
            onLogout={handleLogout}
            currentView={currentView}
            onViewChange={handleViewChange}
          />
        </AuthProvider>
      );
    }
  }

  return (
    <AuthProvider>
      <ProviderDashboard 
        currentView={currentView}
        onViewChange={handleViewChange}
        onLogout={handleLogout}
        onProfileView={handleProfileView}
      />
    </AuthProvider>
  );
}

export default App;