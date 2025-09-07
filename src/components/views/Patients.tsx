import React, { useState } from 'react';
import { Search, Eye, MessageSquare, Video, Phone, Plus, User, Calendar, Activity } from 'lucide-react';
import DataTable from '../DataTable';

interface PatientsProps {
  onProfileView: (type: string, id: string) => void;
}

const Patients: React.FC<PatientsProps> = ({ onProfileView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const patients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 123-4567',
      lastSession: '2024-12-19',
      nextAppointment: '2024-12-22 10:00 AM',
      status: 'Active',
      totalSessions: 12,
      joinDate: '2024-08-15',
      avatar: null,
      primaryConcern: 'Anxiety Management',
      riskLevel: 'Low',
      lastPayment: '2024-12-19',
      insuranceStatus: 'Active'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      lastSession: '2024-12-18',
      nextAppointment: '2024-12-21 2:00 PM',
      status: 'Active',
      totalSessions: 8,
      joinDate: '2024-09-20',
      avatar: null,
      primaryConcern: 'Depression Therapy',
      riskLevel: 'Medium',
      lastPayment: '2024-12-18',
      insuranceStatus: 'Active'
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      phone: '+1 (555) 345-6789',
      lastSession: '2024-12-10',
      nextAppointment: '2024-12-23 4:30 PM',
      status: 'Active',
      totalSessions: 15,
      joinDate: '2024-07-05',
      avatar: null,
      primaryConcern: 'Trauma Counseling',
      riskLevel: 'High',
      lastPayment: '2024-12-10',
      insuranceStatus: 'Pending'
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james.wilson@email.com',
      phone: '+1 (555) 456-7890',
      lastSession: '2024-12-17',
      nextAppointment: '2024-12-20 6:00 PM',
      status: 'Active',
      totalSessions: 6,
      joinDate: '2024-10-12',
      avatar: null,
      primaryConcern: 'Stress Management',
      riskLevel: 'Low',
      lastPayment: '2024-12-17',
      insuranceStatus: 'Active'
    },
    {
      id: 5,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 567-8901',
      lastSession: '2024-12-16',
      nextAppointment: 'Not Scheduled',
      status: 'Inactive',
      totalSessions: 20,
      joinDate: '2024-06-01',
      avatar: null,
      primaryConcern: 'Relationship Counseling',
      riskLevel: 'Low',
      lastPayment: '2024-12-16',
      insuranceStatus: 'Expired'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'Active': 'bg-emerald-100 text-emerald-700',
      'Inactive': 'bg-gray-100 text-gray-700',
      'On Hold': 'bg-amber-100 text-amber-700'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-600'}`}>
        {status}
      </span>
    );
  };

  const getRiskBadge = (riskLevel: string) => {
    const riskClasses = {
      'Low': 'bg-green-100 text-green-700',
      'Medium': 'bg-amber-100 text-amber-700',
      'High': 'bg-red-100 text-red-700'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${riskClasses[riskLevel as keyof typeof riskClasses] || 'bg-gray-100 text-gray-600'}`}>
        {riskLevel} Risk
      </span>
    );
  };

  const columns = [
    {
      key: 'avatar',
      label: 'Patient',
      render: (value: string | null, row: any) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            {value ? (
              <img src={value} alt="" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <span className="text-sm font-bold text-blue-600">
                {row.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <button
              onClick={() => onProfileView('patient', row.id.toString())}
              className="text-lovejoy-600 hover:text-lovejoy-800 font-medium hover:underline transition-colors duration-150 text-left"
            >
              {row.name}
            </button>
            <p className="text-sm text-gray-500">{row.email}</p>
            <p className="text-xs text-gray-400">{row.primaryConcern}</p>
          </div>
        </div>
      ),
    },
    { 
      key: 'phone', 
      label: 'Contact',
      render: (value: string, row: any) => (
        <div>
          <p className="text-sm text-gray-800">{value}</p>
          <p className="text-xs text-gray-500">Insurance: {row.insuranceStatus}</p>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => getStatusBadge(value),
    },
    {
      key: 'riskLevel',
      label: 'Risk Level',
      render: (value: string) => getRiskBadge(value),
    },
    {
      key: 'totalSessions',
      label: 'Sessions',
      render: (value: number) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
          {value}
        </span>
      ),
    },
    { 
      key: 'lastSession', 
      label: 'Last Session',
      render: (value: string, row: any) => (
        <div>
          <p className="text-sm text-gray-800">{value}</p>
          <p className="text-xs text-gray-500">Paid: {row.lastPayment}</p>
        </div>
      )
    },
    { 
      key: 'nextAppointment', 
      label: 'Next Appointment',
      render: (value: string) => (
        <span className={value === 'Not Scheduled' ? 'text-amber-600 font-medium' : 'text-gray-800'}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, row: any) => (
        <div className="flex space-x-1">
          <button 
            onClick={() => onProfileView('patient', row.id.toString())}
            className="bg-lovejoy-500 hover:bg-lovejoy-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-150 flex items-center"
            title="View Profile"
          >
            <Eye className="w-3 h-3" />
          </button>
          <button 
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-150 flex items-center"
            title="Send Message"
          >
            <MessageSquare className="w-3 h-3" />
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-150 flex items-center"
            title="Video Call"
          >
            <Video className="w-3 h-3" />
          </button>
          <button 
            className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-150 flex items-center"
            title="Schedule Appointment"
          >
            <Calendar className="w-3 h-3" />
          </button>
        </div>
      ),
    },
  ];

  const filteredPatients = patients.filter(patient => {
    if (filterStatus === 'all') return true;
    return patient.status.toLowerCase() === filterStatus;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Patients</h1>
        <p className="text-gray-600">Manage your patient relationships and care plans</p>
      </div>

      <div className="glass-card rounded-2xl shadow-lg border border-white/20">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col space-y-4">
            {/* Header with Search */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Patient List</h2>
                <p className="text-sm text-gray-500 mt-1">View and manage all your patients</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass-input pl-10 pr-4 py-2 rounded-lg w-80"
                />
              </div>
            </div>

            {/* Status Filter Pills */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 mr-2">Filter by status:</span>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    filterStatus === 'all' 
                      ? 'glass-button bg-lovejoy-600/20 text-lovejoy-800 shadow-md border border-lovejoy-300' 
                      : 'glass-button text-gray-600 hover:bg-white/20'
                  }`}
                >
                  All ({patients.length})
                </button>
                <button
                  onClick={() => setFilterStatus('active')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    filterStatus === 'active' 
                      ? 'glass-button bg-emerald-500/20 text-emerald-800 shadow-md border border-emerald-300' 
                      : 'glass-button text-emerald-600 hover:bg-emerald-100/20'
                  }`}
                >
                  Active ({patients.filter(p => p.status.toLowerCase() === 'active').length})
                </button>
                <button
                  onClick={() => setFilterStatus('inactive')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    filterStatus === 'inactive' 
                      ? 'glass-button bg-gray-500/20 text-gray-800 shadow-md border border-gray-300' 
                      : 'glass-button text-gray-600 hover:bg-gray-100/20'
                  }`}
                >
                  Inactive ({patients.filter(p => p.status.toLowerCase() === 'inactive').length})
                </button>
              </div>
            </div>
          </div>
        </div>

        <DataTable
          data={filteredPatients}
          columns={columns}
          searchTerm={searchTerm}
          searchKeys={['name', 'email', 'phone']}
        />
      </div>
    </div>
  );
};

export default Patients;