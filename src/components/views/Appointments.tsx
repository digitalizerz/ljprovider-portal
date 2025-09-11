import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Video, Phone, MessageSquare, Check, X, Eye } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAppointments } from '../../hooks/useAppointments';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { formatDate, formatTime } from '../../utils/formatters';

interface AppointmentsProps {
  onProfileView: (type: string, id: string) => void;
}

const Appointments: React.FC<AppointmentsProps> = ({ onProfileView }) => {
  const { token } = useAuth();
  const { 
    appointments, 
    isLoading, 
    error, 
    fetchAppointmentRequests,
    fetchAppointmentsByDate,
    acceptAppointment,
    declineAppointment 
  } = useAppointments();
  
  const [selectedTab, setSelectedTab] = useState('pending');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (token) {
      if (selectedTab === 'pending') {
        fetchAppointmentRequests({ status: 'pending' });
      } else if (selectedTab === 'today') {
        fetchAppointmentsByDate(selectedDate);
      } else {
        fetchAppointmentRequests({ status: selectedTab as any });
      }
    }

  const handleAcceptAppointment = async (appointmentId: number) => {
    try {
      await acceptAppointment(appointmentId);
      // Refresh the list
      fetchAppointmentRequests({ status: 'pending' });
    } catch (error) {
      console.error('Failed to accept appointment:', error);
    }
  };

  const handleDeclineAppointment = async (appointmentId: number) => {
    const reason = prompt('Please provide a reason for declining (optional):');
    try {
      await declineAppointment(appointmentId, reason || undefined);
      // Refresh the list
      fetchAppointmentRequests({ status: 'pending' });
    } catch (error) {
      console.error('Failed to decline appointment:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'pending': 'bg-amber-100 text-amber-700',
      'accepted': 'bg-emerald-100 text-emerald-700',
      'declined': 'bg-red-100 text-red-700',
      'completed': 'bg-blue-100 text-blue-700',
      'cancelled': 'bg-gray-100 text-gray-700'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-600'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'audio':
        return <Phone className="w-4 h-4" />;
      case 'chat':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
        <p className="text-gray-600">Manage your appointment requests and schedule</p>
      </div>

      {error && (
        <ErrorMessage message={error} className="mb-6" />
      )}

      {/* Tabs */}
      <div className="glass-card rounded-2xl shadow-lg border border-white/20 mb-6">
        <div className="border-b border-white/20">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'pending', label: 'Pending Requests', count: appointments.filter(a => a.status === 'pending').length },
              { id: 'today', label: 'Today\'s Schedule', count: 0 },
              { id: 'accepted', label: 'Accepted', count: appointments.filter(a => a.status === 'accepted').length },
              { id: 'completed', label: 'Completed', count: appointments.filter(a => a.status === 'completed').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                  selectedTab === tab.id
                    ? 'border-lovejoy-500 text-lovejoy-700 text-shadow'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-400'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 bg-lovejoy-100 text-lovejoy-600 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Date Selector for Today's Schedule */}
        {selectedTab === 'today' && (
          <div className="p-4 border-b border-white/20">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Select Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="glass-input px-3 py-2 rounded-lg"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        )}

        {/* Appointments List */}
        <div className="p-6">
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {selectedTab === 'pending' ? 'No pending requests' : 'No appointments found'}
              </h3>
              <p className="text-gray-500">
                {selectedTab === 'pending' 
                  ? 'New appointment requests will appear here' 
                  : 'Appointments will be displayed here when available'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="glass-button rounded-lg p-6 hover:bg-white/30 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">
                          {appointment.patient?.name?.split(' ').map(n => n[0]).join('') || 'P'}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-gray-800 text-shadow-light">
                            {appointment.patient?.name || 'Patient'}
                          </h3>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(appointment.appointment_date)}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatTime(appointment.appointment_time)}
                          </span>
                          <span className="flex items-center">
                            {getConsultationIcon(appointment.consultation_type)}
                            <span className="ml-1 capitalize">{appointment.consultation_type}</span>
                          </span>
                        </div>
                        {appointment.symptoms && (
                          <p className="text-sm text-gray-600 mt-2">
                            <strong>Symptoms:</strong> {appointment.symptoms}
                          </p>
                        )}
                        {appointment.notes && (
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Notes:</strong> {appointment.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-gray-800">
                        ${appointment.total_amount}
                      </span>
                      
                      {selectedTab === 'pending' && (
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handleAcceptAppointment(appointment.id)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleDeclineAppointment(appointment.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Decline
                          </button>
                        </div>
                      )}
                      
                      {appointment.patient && (
                        <button
                          onClick={() => onProfileView('patient', appointment.patient.id.toString())}
                          className="bg-lovejoy-500 hover:bg-lovejoy-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
