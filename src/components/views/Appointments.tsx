import React, { useState } from 'react';
import { Search, Calendar, Clock, Video, Users, Plus, CheckCircle, X, Phone, Filter, ChevronLeft, ChevronRight, Edit, Trash2, Eye } from 'lucide-react';
import DataTable from '../DataTable';

interface AppointmentsProps {
  onProfileView: (type: string, id: string) => void;
}

const Appointments: React.FC<AppointmentsProps> = ({ onProfileView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history' | 'slots' | 'schedule'>('upcoming');
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCreateSlotsModal, setShowCreateSlotsModal] = useState(false);
  const [showEditSlotModal, setShowEditSlotModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // History filters
  const [historyFilters, setHistoryFilters] = useState({
    status: 'all',
    dateRange: 'all',
    sessionType: 'all',
    paymentStatus: 'all'
  });

  const upcomingAppointments = [
    {
      id: 1,
      patientId: '1',
      patient: 'Sarah Johnson',
      date: '2024-12-22',
      time: '10:00 AM',
      type: 'Video Call',
      status: 'Confirmed',
      duration: '50 min',
      notes: 'Follow-up session for anxiety management',
      concern: 'Anxiety Management',
      sessionType: 'Individual Therapy',
      fee: 150,
      insuranceCovered: true
    },
    {
      id: 2,
      patientId: '2',
      patient: 'Michael Chen',
      date: '2024-12-21',
      time: '2:00 PM',
      type: 'In-Person',
      status: 'Confirmed',
      duration: '50 min',
      notes: 'Depression therapy session - medication review',
      concern: 'Depression Therapy',
      sessionType: 'Individual Therapy',
      fee: 150,
      insuranceCovered: true
    },
    {
      id: 3,
      patientId: '3',
      patient: 'Emma Davis',
      date: '2024-12-23',
      time: '4:30 PM',
      type: 'Video Call',
      status: 'Pending',
      duration: '50 min',
      notes: 'Trauma counseling - EMDR session',
      concern: 'Trauma Counseling',
      sessionType: 'EMDR Therapy',
      fee: 175,
      insuranceCovered: false
    }
  ];

  const appointmentHistory = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      date: '2024-12-20',
      time: '09:00 AM',
      sessionType: 'Individual Therapy',
      status: 'completed',
      fee: 150,
      duration: '50 min',
      notes: 'Patient showed significant improvement in anxiety management',
      paymentStatus: 'paid',
      type: 'Video Call'
    },
    {
      id: 2,
      patient: 'Michael Chen',
      date: '2024-12-19',
      time: '02:00 PM',
      sessionType: 'Individual Therapy',
      status: 'completed',
      fee: 150,
      duration: '50 min',
      notes: 'Discussed medication adjustments and coping strategies',
      paymentStatus: 'paid',
      type: 'Video Call'
    },
    {
      id: 3,
      patient: 'Emma Davis',
      date: '2024-12-22',
      time: '04:30 PM',
      sessionType: 'EMDR Session',
      status: 'accepted',
      fee: 225,
      duration: '90 min',
      notes: 'Upcoming EMDR session for trauma processing',
      paymentStatus: 'pending',
      type: 'Video Call'
    },
    {
      id: 4,
      patient: 'John Smith',
      date: '2024-12-18',
      time: '11:00 AM',
      sessionType: 'Individual Therapy',
      status: 'cancelled',
      fee: 150,
      duration: '50 min',
      notes: 'Patient cancelled due to illness - rescheduled',
      paymentStatus: 'refunded',
      type: 'Phone Call'
    },
    {
      id: 5,
      patient: 'James Wilson',
      date: '2024-12-21',
      time: '06:00 PM',
      sessionType: 'Individual Therapy',
      status: 'pending',
      fee: 150,
      duration: '50 min',
      notes: 'Awaiting patient confirmation',
      paymentStatus: 'pending',
      type: 'Video Call'
    },
    {
      id: 6,
      patient: 'Maria Garcia',
      date: '2024-12-17',
      time: '03:00 PM',
      sessionType: 'Couples Therapy',
      status: 'declined',
      fee: 200,
      duration: '60 min',
      notes: 'Declined due to scheduling conflict',
      paymentStatus: 'not_applicable',
      type: 'In-Person'
    }
  ];

  const [appointmentSlots, setAppointmentSlots] = useState([
    {
      id: 1,
      dayOfWeek: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      sessionType: 'Individual Therapy',
      fee: 150,
      isRecurring: true,
      status: 'active',
      maxBookings: 1
    },
    {
      id: 2,
      dayOfWeek: 'Monday',
      startTime: '14:00',
      endTime: '15:00',
      sessionType: 'Individual Therapy',
      fee: 150,
      isRecurring: true,
      status: 'active',
      maxBookings: 1
    },
    {
      id: 3,
      dayOfWeek: 'Tuesday',
      startTime: '10:00',
      endTime: '11:00',
      sessionType: 'Couples Therapy',
      fee: 200,
      isRecurring: true,
      status: 'active',
      maxBookings: 1
    },
    {
      id: 4,
      dayOfWeek: 'Wednesday',
      startTime: '16:00',
      endTime: '17:30',
      sessionType: 'EMDR Session',
      fee: 225,
      isRecurring: true,
      status: 'active',
      maxBookings: 1
    },
    {
      id: 5,
      dayOfWeek: 'Friday',
      startTime: '11:00',
      endTime: '12:00',
      sessionType: 'Group Therapy',
      fee: 75,
      isRecurring: true,
      status: 'active',
      maxBookings: 6
    }
  ]);

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const getWeekDates = () => {
    const week = [];
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const weekDates = getWeekDates();

  const handleConfirmAppointment = (appointmentId: number) => {
    console.log('Confirming appointment:', appointmentId);
    alert('Appointment confirmed successfully!');
  };

  const handleCancelAppointment = (appointmentId: number) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      console.log('Cancelling appointment:', appointmentId);
      alert('Appointment cancelled successfully!');
    }
  };

  const handleRescheduleAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const handleJoinVideoCall = (appointmentId: number) => {
    console.log('Joining video call for appointment:', appointmentId);
    alert('Launching video call...');
  };

  const handleAppointmentAction = (appointmentId: number, action: 'accept' | 'decline' | 'complete') => {
    alert(`Appointment ${action}ed successfully!`);
  };

  const handleEditSlot = (slot: any) => {
    setSelectedSlot(slot);
    setShowEditSlotModal(true);
  };

  const handleDeleteSlot = (slotId: number) => {
    if (confirm('Are you sure you want to delete this appointment slot?')) {
      setAppointmentSlots(prev => prev.filter(slot => slot.id !== slotId));
      alert('Appointment slot deleted successfully!');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'Confirmed': 'bg-emerald-100 text-emerald-700',
      'Pending': 'bg-amber-100 text-amber-700',
      'Completed': 'bg-blue-100 text-blue-700',
      'Cancelled': 'bg-red-100 text-red-700',
      'completed': 'bg-emerald-100 text-emerald-700',
      'accepted': 'bg-blue-100 text-blue-700',
      'pending': 'bg-amber-100 text-amber-700',
      'cancelled': 'bg-gray-100 text-gray-700',
      'declined': 'bg-red-100 text-red-700',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-600'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentBadge = (paymentStatus: string) => {
    const paymentClasses = {
      'paid': 'bg-emerald-100 text-emerald-700',
      'pending': 'bg-amber-100 text-amber-700',
      'refunded': 'bg-blue-100 text-blue-700',
      'not_applicable': 'bg-gray-100 text-gray-700',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${paymentClasses[paymentStatus as keyof typeof paymentClasses] || 'bg-gray-100 text-gray-600'}`}>
        {paymentStatus.replace('_', ' ').charAt(0).toUpperCase() + paymentStatus.replace('_', ' ').slice(1)}
      </span>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video Call':
        return <Video className="w-4 h-4 text-blue-500" />;
      case 'Phone Call':
        return <Phone className="w-4 h-4 text-green-500" />;
      case 'In-Person':
        return <Users className="w-4 h-4 text-purple-500" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  const upcomingColumns = [
    {
      key: 'patient',
      label: 'Patient',
      render: (value: string, row: any) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-blue-600">
              {value.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <button
              onClick={() => onProfileView('patient', row.patientId)}
              className="font-medium text-lovejoy-600 hover:text-lovejoy-800 hover:underline transition-colors duration-150 text-left"
            >
              {value}
            </button>
          </div>
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date & Time',
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.time}</div>
          <div className="text-xs text-gray-400">{row.sessionType}</div>
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          {getTypeIcon(value)}
          <span className="text-sm font-medium text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      key: 'duration',
      label: 'Duration',
      render: (value: string) => (
        <div>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
            {value}
          </span>
        </div>
      ),
    },
    {
      key: 'fee',
      label: 'Fee',
      render: (value: number, row: any) => (
        <div>
          <div className="font-medium text-gray-900">${value}</div>
          <div className={`text-xs ${row.insuranceCovered ? 'text-green-600' : 'text-amber-600'}`}>
            {row.insuranceCovered ? 'Insurance' : 'Self-pay'}
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => getStatusBadge(value),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, row: any) => (
        <div className="flex space-x-1">
          {row.status === 'Pending' && (
            <button 
              onClick={() => handleConfirmAppointment(row.id)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-150 flex items-center"
              title="Confirm"
            >
              <CheckCircle className="w-3 h-3" />
            </button>
          )}
          {(row.status === 'Confirmed' || row.status === 'Pending') && (
            <>
              <button 
                onClick={() => handleRescheduleAppointment(row)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-150 flex items-center"
                title="Reschedule"
              >
                <Clock className="w-3 h-3" />
              </button>
              <button 
                onClick={() => handleCancelAppointment(row.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-150 flex items-center"
                title="Cancel"
              >
                <X className="w-3 h-3" />
              </button>
            </>
          )}
          {row.type === 'Video Call' && row.status === 'Confirmed' && (
            <button 
              onClick={() => handleJoinVideoCall(row.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-150 flex items-center"
              title="Join Call"
            >
              <Video className="w-3 h-3" />
            </button>
          )}
        </div>
      ),
    },
  ];

  const historyColumns = [
    {
      key: 'patient',
      label: 'Patient',
      render: (value: string) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-blue-600">
              {value.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="font-medium text-gray-900">{value}</div>
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date & Time',
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.time}</div>
          <div className="text-xs text-gray-400">{row.sessionType}</div>
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          {getTypeIcon(value)}
          <span className="text-sm font-medium text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      key: 'duration',
      label: 'Duration',
      render: (value: string) => (
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
          {value}
        </span>
      ),
    },
    {
      key: 'fee',
      label: 'Fee',
      render: (value: number) => (
        <div className="font-medium text-gray-900">${value}</div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => getStatusBadge(value),
    },
    {
      key: 'paymentStatus',
      label: 'Payment',
      render: (value: string) => getPaymentBadge(value),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, row: any) => (
        <div className="flex space-x-1">
          {row.status === 'pending' && (
            <>
              <button
                onClick={() => handleAppointmentAction(row.id, 'accept')}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-150 flex items-center"
                title="Accept"
              >
                <CheckCircle className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleAppointmentAction(row.id, 'decline')}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-150 flex items-center"
                title="Decline"
              >
                <X className="w-3 h-3" />
              </button>
            </>
          )}
          {row.status === 'accepted' && (
            <button
              onClick={() => handleAppointmentAction(row.id, 'complete')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-150 flex items-center"
              title="Mark Complete"
            >
              <CheckCircle className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={() => {
              setSelectedAppointment(row);
              setShowAppointmentModal(true);
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-150 flex items-center"
            title="View Details"
          >
            <Eye className="w-3 h-3" />
          </button>
        </div>
      ),
    },
  ];

  // Filter appointment history based on selected filters
  const filteredHistory = appointmentHistory.filter(appointment => {
    if (historyFilters.status !== 'all' && appointment.status !== historyFilters.status) return false;
    if (historyFilters.sessionType !== 'all' && appointment.sessionType !== historyFilters.sessionType) return false;
    if (historyFilters.paymentStatus !== 'all' && appointment.paymentStatus !== historyFilters.paymentStatus) return false;
    
    // Date range filtering
    if (historyFilters.dateRange !== 'all') {
      const appointmentDate = new Date(appointment.date);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - appointmentDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (historyFilters.dateRange) {
        case 'today':
          if (daysDiff !== 0) return false;
          break;
        case 'week':
          if (daysDiff > 7) return false;
          break;
        case 'month':
          if (daysDiff > 30) return false;
          break;
        case 'quarter':
          if (daysDiff > 90) return false;
          break;
      }
    }
    
    return true;
  });

  const filteredUpcoming = upcomingAppointments.filter(appointment => {
    if (filterStatus === 'all') return true;
    return appointment.status.toLowerCase() === filterStatus;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments & Schedule</h1>
        <p className="text-gray-600">Manage your appointments, availability, and schedule</p>
      </div>

      {/* Tab Navigation */}
      <div className="glass-card rounded-2xl shadow-lg border border-white/20 mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === 'upcoming'
                    ? 'bg-lovejoy-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/20'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === 'history'
                    ? 'bg-lovejoy-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/20'
                }`}
              >
                History
              </button>
              <button
                onClick={() => setActiveTab('slots')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === 'slots'
                    ? 'bg-lovejoy-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/20'
                }`}
              >
                Availability Slots
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === 'schedule'
                    ? 'bg-lovejoy-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/20'
                }`}
              >
                Weekly View
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {activeTab === 'upcoming' && (
                <button 
                  onClick={() => setShowNewAppointmentModal(true)}
                  className="primary-button px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Appointment
                </button>
              )}
              {activeTab === 'slots' && (
                <button 
                  onClick={() => setShowCreateSlotsModal(true)}
                  className="primary-button px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Availability Slots
                </button>
              )}
            </div>
          </div>

          {/* Upcoming Appointments */}
          {activeTab === 'upcoming' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
                  <p className="text-sm text-gray-500 mt-1">View and manage your scheduled appointments</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="glass-input pl-10 pr-4 py-2 rounded-lg w-80"
                  />
                </div>
              </div>

              {/* Status Filter Pills */}
              <div className="flex items-center space-x-2 mb-6">
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
                    All ({upcomingAppointments.length})
                  </button>
                  <button
                    onClick={() => setFilterStatus('confirmed')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      filterStatus === 'confirmed' 
                        ? 'glass-button bg-emerald-500/20 text-emerald-800 shadow-md border border-emerald-300' 
                        : 'glass-button text-emerald-600 hover:bg-emerald-100/20'
                    }`}
                  >
                    Confirmed ({upcomingAppointments.filter(a => a.status.toLowerCase() === 'confirmed').length})
                  </button>
                  <button
                    onClick={() => setFilterStatus('pending')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      filterStatus === 'pending' 
                        ? 'glass-button bg-amber-500/20 text-amber-800 shadow-md border border-amber-300' 
                        : 'glass-button text-amber-600 hover:bg-amber-100/20'
                    }`}
                  >
                    Pending ({upcomingAppointments.filter(a => a.status.toLowerCase() === 'pending').length})
                  </button>
                </div>
              </div>

              <DataTable
                data={filteredUpcoming}
                columns={upcomingColumns}
                searchTerm={searchTerm}
                searchKeys={['patient', 'type', 'notes']}
              />
            </div>
          )}

          {/* Appointment History */}
          {activeTab === 'history' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Appointment History</h2>
                  <p className="text-sm text-gray-500 mt-1">View all past and future appointments</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search history..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="glass-input pl-10 pr-4 py-2 rounded-lg w-80"
                  />
                </div>
              </div>

              {/* Advanced Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={historyFilters.status}
                    onChange={(e) => setHistoryFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="glass-input w-full px-3 py-2 rounded-lg"
                  >
                    <option value="all">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="accepted">Accepted</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select
                    value={historyFilters.dateRange}
                    onChange={(e) => setHistoryFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                    className="glass-input w-full px-3 py-2 rounded-lg"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                    <option value="quarter">Last 90 Days</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
                  <select
                    value={historyFilters.sessionType}
                    onChange={(e) => setHistoryFilters(prev => ({ ...prev, sessionType: e.target.value }))}
                    className="glass-input w-full px-3 py-2 rounded-lg"
                  >
                    <option value="all">All Types</option>
                    <option value="Individual Therapy">Individual Therapy</option>
                    <option value="Couples Therapy">Couples Therapy</option>
                    <option value="EMDR Session">EMDR Session</option>
                    <option value="Group Therapy">Group Therapy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                  <select
                    value={historyFilters.paymentStatus}
                    onChange={(e) => setHistoryFilters(prev => ({ ...prev, paymentStatus: e.target.value }))}
                    className="glass-input w-full px-3 py-2 rounded-lg"
                  >
                    <option value="all">All Payments</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="refunded">Refunded</option>
                    <option value="not_applicable">Not Applicable</option>
                  </select>
                </div>
              </div>

              <DataTable
                data={filteredHistory}
                columns={historyColumns}
                searchTerm={searchTerm}
                searchKeys={['patient', 'sessionType', 'notes']}
              />
            </div>
          )}

          {/* Availability Slots */}
          {activeTab === 'slots' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-shadow">Your Availability Slots</h3>
              <div className="space-y-4">
                {appointmentSlots.map((slot) => (
                  <div key={slot.id} className="glass-button rounded-lg p-4 hover:bg-white/30 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-lovejoy-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-lovejoy-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 text-shadow-light">{slot.dayOfWeek}</h4>
                          <p className="text-sm text-gray-600">{slot.startTime} - {slot.endTime}</p>
                          <p className="text-xs text-gray-500">{slot.sessionType} • ${slot.fee} • Max {slot.maxBookings} booking{slot.maxBookings > 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          slot.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {slot.status}
                        </span>
                        <button
                          onClick={() => handleEditSlot(slot)}
                          className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
                          title="Edit Slot"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
                          title="Delete Slot"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weekly Schedule View */}
          {activeTab === 'schedule' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateWeek('prev')}
                    className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {currentDate.toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </h2>
                  <button
                    onClick={() => navigateWeek('next')}
                    className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-8 gap-4">
                {/* Time Column */}
                <div className="space-y-4">
                  <div className="h-12"></div>
                  {timeSlots.map((time) => (
                    <div key={time} className="h-16 flex items-center">
                      <span className="text-sm text-gray-500 font-medium">{time}</span>
                    </div>
                  ))}
                </div>

                {/* Day Columns */}
                {weekDates.map((date, dayIndex) => (
                  <div key={dayIndex} className="space-y-4">
                    <div className="h-12 flex flex-col items-center justify-center glass-card rounded-lg border border-white/20">
                      <span className="text-sm font-medium text-gray-600">
                        {weekDays[dayIndex]}
                      </span>
                      <span className="text-lg font-bold text-gray-800">
                        {date.getDate()}
                      </span>
                    </div>
                    
                    {timeSlots.map((time, timeIndex) => (
                      <div
                        key={timeIndex}
                        className="h-16 glass-card rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer relative"
                      >
                        {/* Sample appointments */}
                        {dayIndex === 2 && timeIndex === 2 && (
                          <div className="absolute inset-1 bg-blue-100 border border-blue-300 rounded p-2">
                            <div className="text-xs font-medium text-blue-800">Sarah Johnson</div>
                            <div className="text-xs text-blue-600">Individual Therapy</div>
                          </div>
                        )}
                        {dayIndex === 2 && timeIndex === 6 && (
                          <div className="absolute inset-1 bg-green-100 border border-green-300 rounded p-2">
                            <div className="text-xs font-medium text-green-800">Michael Chen</div>
                            <div className="text-xs text-green-600">Individual Therapy</div>
                          </div>
                        )}
                        {dayIndex === 4 && timeIndex === 8 && (
                          <div className="absolute inset-1 bg-yellow-100 border border-yellow-300 rounded p-2">
                            <div className="text-xs font-medium text-yellow-800">Emma Davis</div>
                            <div className="text-xs text-yellow-600">EMDR Session</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Appointment Modal */}
      {showNewAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Schedule New Appointment</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                  <option value="">Select Patient</option>
                  <option value="1">Sarah Johnson</option>
                  <option value="2">Michael Chen</option>
                  <option value="3">Emma Davis</option>
                  <option value="4">John Smith</option>
                  <option value="5">James Wilson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                  <option value="individual">Individual Therapy (50 min) - $150</option>
                  <option value="couples">Couples Therapy (60 min) - $200</option>
                  <option value="emdr">EMDR Session (90 min) - $225</option>
                  <option value="checkin">Check-in Call (30 min) - $75</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Format</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                  <option value="video">Video Call</option>
                  <option value="phone">Phone Call</option>
                  <option value="inperson">In-Person</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900" 
                  rows={3}
                  placeholder="Any specific topics or concerns to address..."
                ></textarea>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewAppointmentModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Appointment scheduled successfully!');
                    setShowNewAppointmentModal(false);
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Multiple Availability Slots Modal */}
      {showCreateSlotsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Create Availability Slots</h3>
            <p className="text-gray-600 mb-6">Set up your weekly availability by selecting days, times, and session types</p>
            
            <form className="space-y-6">
              {/* Days Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Days</label>
                <div className="grid grid-cols-4 gap-3">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <label key={day} className="flex items-center space-x-2 glass-button rounded-lg p-3 cursor-pointer hover:bg-white/30">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm font-medium text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Time Slots</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                      <input
                        type="time"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                        defaultValue="09:00"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">End Time</label>
                      <input
                        type="time"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                        defaultValue="10:00"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">Break Between (min)</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                        <option value="0">No Break</option>
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800 mb-2">
                      <strong>Smart Slot Generation:</strong> We'll automatically create individual slots based on your session duration
                    </p>
                    <p className="text-xs text-blue-600">
                      Example: 9:00 AM - 5:00 PM with 50-minute sessions = 8 individual appointment slots
                    </p>
                  </div>
                </div>
              </div>

              {/* Session Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Session Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                    <option value="Individual Therapy">Individual Therapy (50 min)</option>
                    <option value="Couples Therapy">Couples Therapy (60 min)</option>
                    <option value="EMDR Session">EMDR Session (90 min)</option>
                    <option value="Group Therapy">Group Therapy (60 min)</option>
                    <option value="Check-in Call">Check-in Call (30 min)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Duration (minutes)</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="50">50 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fee per Session ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="25"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    placeholder="150"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Bookings per Slot</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                    <option value="1">1 (Individual)</option>
                    <option value="2">2 (Couples)</option>
                    <option value="6">6 (Small Group)</option>
                    <option value="12">12 (Large Group)</option>
                  </select>
                </div>
              </div>

              {/* Advanced Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Advanced Options</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                    <span className="text-sm text-gray-700">Make these recurring weekly slots</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                    <span className="text-sm text-gray-700">Allow online booking for these slots</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Require 24-hour advance booking</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Send me email notifications for new bookings</span>
                  </label>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-800 mb-2">Preview</h4>
                <p className="text-sm text-gray-600">
                  Based on your selections, we'll create <strong>56 individual appointment slots</strong> across your selected days.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  You can always edit or delete individual slots after creation.
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateSlotsModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Availability slots created successfully! 56 slots have been added to your schedule.');
                    setShowCreateSlotsModal(false);
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Create Slots
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Reschedule Appointment - {selectedAppointment.patient}
            </h3>
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Current:</strong> {selectedAppointment.date} at {selectedAppointment.time}
              </p>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Date</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Time</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Reschedule</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                  <option value="provider">Provider Schedule Change</option>
                  <option value="patient">Patient Request</option>
                  <option value="emergency">Emergency</option>
                  <option value="illness">Illness</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900" 
                  rows={3}
                  placeholder="Any additional information..."
                ></textarea>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="notifyPatient" className="rounded text-blue-600 focus:ring-blue-500" />
                <label htmlFor="notifyPatient" className="text-sm text-gray-700">
                  Send notification to patient
                </label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowRescheduleModal(false);
                    setSelectedAppointment(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Appointment rescheduled successfully!');
                    setShowRescheduleModal(false);
                    setSelectedAppointment(null);
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Slot Modal */}
      {showEditSlotModal && selectedSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Appointment Slot</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Appointment slot updated successfully!');
              setShowEditSlotModal(false);
              setSelectedSlot(null);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Day of Week</label>
                <select defaultValue={selectedSlot.dayOfWeek} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    defaultValue={selectedSlot.startTime}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input
                    type="time"
                    defaultValue={selectedSlot.endTime}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
                <select defaultValue={selectedSlot.sessionType} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                  <option value="Individual Therapy">Individual Therapy (50 min)</option>
                  <option value="Couples Therapy">Couples Therapy (60 min)</option>
                  <option value="EMDR Session">EMDR Session (90 min)</option>
                  <option value="Group Therapy">Group Therapy (60 min)</option>
                  <option value="Check-in Call">Check-in Call (30 min)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fee ($)</label>
                <input
                  type="number"
                  min="0"
                  step="25"
                  defaultValue={selectedSlot.fee}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Bookings</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  defaultValue={selectedSlot.maxBookings}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select defaultValue={selectedSlot.status} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="editIsRecurring" defaultChecked={selectedSlot.isRecurring} className="rounded text-blue-600 focus:ring-blue-500" />
                <label htmlFor="editIsRecurring" className="text-sm text-gray-700">
                  Recurring weekly slot
                </label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditSlotModal(false);
                    setSelectedSlot(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Update Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {showAppointmentModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Appointment Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                  <p className="text-gray-900">{selectedAppointment.patient}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                  <p className="text-gray-900">{selectedAppointment.date} at {selectedAppointment.time}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
                  <p className="text-gray-900">{selectedAppointment.sessionType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <p className="text-gray-900">{selectedAppointment.duration}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fee</label>
                  <p className="text-gray-900">${selectedAppointment.fee}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  {getStatusBadge(selectedAppointment.status)}
                </div>
              </div>
              {selectedAppointment.paymentStatus && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                  {getPaymentBadge(selectedAppointment.paymentStatus)}
                </div>
              )}
              {selectedAppointment.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedAppointment.notes}</p>
                </div>
              )}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowAppointmentModal(false);
                    setSelectedAppointment(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Close
                </button>
                {selectedAppointment.status === 'pending' && (
                  <button
                    onClick={() => {
                      handleAppointmentAction(selectedAppointment.id, 'accept');
                      setShowAppointmentModal(false);
                      setSelectedAppointment(null);
                    }}
                    className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all duration-300"
                  >
                    Accept Appointment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;