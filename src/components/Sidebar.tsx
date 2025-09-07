import React from 'react';
import { 
  Heart, 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageSquare,
  Video,
  DollarSign,
  User,
  Settings,
  FileText,
  Clock
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    // Main Section
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', section: 'MAIN' },
    { id: 'patients', icon: Users, label: 'My Patients', section: 'MAIN' },
    { id: 'appointments', icon: Calendar, label: 'Appointments', section: 'MAIN' },
    { id: 'messages', icon: MessageSquare, label: 'Messages', section: 'MAIN' },
    { id: 'video-calls', icon: Video, label: 'Video Calls', section: 'MAIN' },

    // Practice Management
    { id: 'wallet', icon: DollarSign, label: 'Wallet & Earnings', section: 'PRACTICE' },
    { id: 'documents', icon: FileText, label: 'Documents', section: 'PRACTICE' },

    // Account
    { id: 'profile', icon: User, label: 'My Profile', section: 'ACCOUNT' },
    { id: 'settings', icon: Settings, label: 'Settings', section: 'ACCOUNT' },
  ];

  const sections = ['MAIN', 'PRACTICE', 'ACCOUNT'];

  return (
    <div className="w-64 glass-sidebar flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-lovejoy-600 rounded-lg flex items-center justify-center mr-3 glow">
            <Heart className="w-5 h-5 text-gold-500" />
          </div>
          <div>
            <h1 className="text-lg text-display text-gray-800 text-shadow">PROVIDER PORTAL</h1>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {sections.map((section) => (
          <div key={section} className="mb-6">
            <h3 className="px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3 text-shadow-light">
              {section}
            </h3>
            {menuItems
              .filter((item) => item.section === section)
              .map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`nav-item w-full flex items-center px-6 py-3 text-sm font-medium mx-2 ${
                      isActive
                        ? 'active bg-white/30 text-gray-900 shadow-lg border-l-4 border-lovejoy-500'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                );
              })}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;