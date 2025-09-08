import React from 'react';
import { LogOut, Bell, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const { doctor } = useAuth();
  
  const doctorName = doctor 
    ? `${doctor.first_name} ${doctor.last_name}`
    : 'Doctor';
  return (
    <header className="glass-header px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-800 text-shadow">
            Welcome back, {doctorName}
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300 relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Profile */}
          <button className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
            <User className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Logout */}
          <button
            onClick={onLogout}
            className="primary-button flex items-center px-4 py-2 text-sm font-medium"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
