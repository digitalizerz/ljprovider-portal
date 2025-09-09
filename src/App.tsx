import React, { useState } from 'react';
import { AuthProvider } from './hooks/useAuth.tsx';
import { useAuth } from './hooks/useAuth.tsx';
import LoginScreen from './components/LoginScreen';
import ProviderDashboard from './components/ProviderDashboard';
import PatientProfile from './components/profiles/PatientProfile';

const AppContent: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedProfile, setSelectedProfile] = useState<{type: string, id: string} | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      console.log('🚀 App.tsx calling useAuth.login with:', { email });
      await login(email, password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('❌ Login failed in App.tsx:', error);
      alert('Login failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
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
    setSelectedProfile(null);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} isLoading={isLoading} />;
  }

  if (selectedProfile) {
    if (selectedProfile.type === 'patient') {
      return (
        <PatientProfile 
          patientId={selectedProfile.id} 
          onBack={() => setSelectedProfile(null)} 
          onLogout={handleLogout}
          currentView={currentView}
          onViewChange={handleViewChange}
        />
      );
    }
  }

  return (
    <ProviderDashboard 
      currentView={currentView}
      onViewChange={handleViewChange}
      onLogout={handleLogout}
      onProfileView={handleProfileView}
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;