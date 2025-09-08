import React, { useState, useEffect } from 'react';
import { Calendar, Users, MessageSquare, TrendingUp, Activity, Clock, Video } from 'lucide-react';
import MetricCard from '../MetricCard';
import ChartCard from '../ChartCard';
import { useAuth } from '../../hooks/useAuth';
import { AppointmentAPI } from '../../services/appointmentAPI';
import { DoctorAPI } from '../../services/doctorAPI';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

interface DashboardProps {
  onViewChange: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const { doctor, token } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    todayAppointments: 0,
    newMessages: 0,
    totalPatients: 0,
    upcomingAppointments: [],
    recentMessages: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token && doctor) {
      fetchDashboardData();
    }
  }, [token, doctor]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch today's appointments
      const today = new Date().toISOString().split('T')[0];
      const appointmentsResponse = await AppointmentAPI.fetchAcceptedAppointsByDate({ date: today }, token!);
      
      // Fetch pending appointment requests (these will show as messages)
      const pendingResponse = await AppointmentAPI.fetchAppointmentRequests({ 
        status: 'pending',
        limit: 10 
      }, token!);

      // Fetch doctor notifications as messages
      const notificationsResponse = await DoctorAPI.fetchDoctorNotifications({ 
        limit: 10 
      }, token!);

      // Calculate metrics
      const todayAppointments = appointmentsResponse.success ? appointmentsResponse.data.length : 0;
      const pendingCount = pendingResponse.success ? pendingResponse.data.data.length : 0;
      const notificationCount = notificationsResponse.success ? notificationsResponse.data.data.filter(n => !n.is_read).length : 0;
      
      // Get upcoming appointments for today
      const upcomingAppointments = appointmentsResponse.success ? appointmentsResponse.data.slice(0, 3) : [];
      
      // Combine pending appointments and notifications as messages
      const recentMessages = [];
      
      if (pendingResponse.success) {
        pendingResponse.data.data.slice(0, 3).forEach(appointment => {
          recentMessages.push({
            id: `apt-${appointment.id}`,
            title: 'New Appointment Request',
            message: `${appointment.patient?.name || 'Patient'} has requested an appointment for ${appointment.appointment_date}`,
            created_at: appointment.created_at,
            is_read: false,
            type: 'appointment'
          });
        });
      }

      if (notificationsResponse.success) {
        notificationsResponse.data.data.slice(0, 3).forEach(notification => {
          recentMessages.push({
            id: `notif-${notification.id}`,
            title: notification.title,
            message: notification.message,
            created_at: notification.created_at,
            is_read: notification.is_read,
            type: notification.type
          });
        });
      }

      setDashboardData({
        todayAppointments,
        newMessages: pendingCount + notificationCount,
        totalPatients: 0, // We'll need a separate API call for this
        upcomingAppointments,
        recentMessages: recentMessages.slice(0, 3)
      });

    } catch (err) {
      console.error('Dashboard data fetch error:', err);
      setError('Failed to load dashboard data');
      
      // Fallback to sample data if API fails
      setDashboardData({
        todayAppointments: 0,
        newMessages: 0,
        totalPatients: 0,
        upcomingAppointments: [],
        recentMessages: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  const appointmentData = [
    { period: 'Mon', appointments: 4 },
    { period: 'Tue', appointments: 6 },
    { period: 'Wed', appointments: 3 },
    { period: 'Thu', appointments: 8 },
    { period: 'Fri', appointments: 5 },
    { period: 'Sat', appointments: 2 },
    { period: 'Sun', appointments: 1 },
  ];

  const earningsData = [
    { period: 'Week 1', amount: 1200 },
    { period: 'Week 2', amount: 1450 },
    { period: 'Week 3', amount: 1100 },
    { period: 'Week 4', amount: 1650 },
  ];

  const doctorName = doctor 
    ? `${doctor.first_name} ${doctor.last_name}`
    : 'Doctor';

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {error && (
        <ErrorMessage message={error} onDismiss={() => setError(null)} className="mb-6" />
      )}

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-display text-gray-800 mb-2 text-shadow">Dashboard</h1>
        <p className="text-body text-gray-600 text-shadow-light">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div onClick={() => onViewChange('appointments')} className="cursor-pointer">
          <MetricCard
            title="Today's Appointments"
            value={dashboardData.todayAppointments.toString()}
            change={dashboardData.todayAppointments > 0 ? `${dashboardData.todayAppointments} scheduled` : 'No appointments today'}
            changeType={dashboardData.todayAppointments > 0 ? "positive" : "neutral"}
            icon={Calendar}
            color="blue"
          />
        </div>
        <div onClick={() => onViewChange('messages')} className="cursor-pointer">
          <MetricCard
            title="New Messages"
            value={dashboardData.newMessages.toString()}
            change={dashboardData.newMessages > 0 ? `${dashboardData.newMessages} unread` : 'No new messages'}
            changeType={dashboardData.newMessages > 0 ? "positive" : "neutral"}
            icon={MessageSquare}
            color="emerald"
          />
        </div>
        <div onClick={() => onViewChange('patients')} className="cursor-pointer">
          <MetricCard
            title="Total Patients"
            value={dashboardData.totalPatients.toString()}
            change="Active patients"
            changeType="neutral"
            icon={Users}
            color="purple"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6">
          <ChartCard 
            title="Weekly Appointments" 
            data={appointmentData}
            type="line"
            dataKey="appointments"
          />
        </div>
        <div className="glass-card rounded-2xl p-6">
          <ChartCard 
            title="Monthly Earnings" 
            data={earningsData}
            type="bar"
            dataKey="amount"
            prefix="$"
          />
        </div>
      </div>

      {/* Today's Schedule, Messages & Tasks */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center mb-6">
            <div className="p-2 glass-button rounded-lg mr-3 glow">
              <Clock className="w-5 h-5 text-gray-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 text-shadow">Today's Schedule</h3>
          </div>
          
          <div className="space-y-4">
            {dashboardData.upcomingAppointments.length > 0 ? (
              dashboardData.upcomingAppointments.map((appointment: any) => (
                <div key={appointment.id} className="glass-button rounded-lg p-4 hover:bg-white/30 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-lovejoy-100 rounded-full flex items-center justify-center">
                        {appointment.consultation_type === 'video' ? (
                          <Video className="w-5 h-5 text-lovejoy-600" />
                        ) : (
                          <Users className="w-5 h-5 text-lovejoy-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-shadow-light">
                          {appointment.patient?.name || 'Patient'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {appointment.appointment_time} • {appointment.consultation_type}
                        </p>
                        {appointment.symptoms && (
                          <p className="text-xs text-gray-500">{appointment.symptoms}</p>
                        )}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'accepted' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No appointments scheduled for today</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center mb-6">
            <div className="p-2 glass-button rounded-lg mr-3 glow">
              <MessageSquare className="w-5 h-5 text-gray-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 text-shadow">Recent Messages</h3>
          </div>
          
          <div className="space-y-4">
            {dashboardData.recentMessages.length > 0 ? (
              dashboardData.recentMessages.map((message: any) => (
                <div key={message.id} className="glass-button rounded-lg p-4 hover:bg-white/30 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">
                          {message.title.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-800 text-shadow-light">{message.title}</p>
                          {!message.is_read && (
                            <div className="flex items-center space-x-1">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              {message.type === 'appointment' && (
                                <span className="text-xs bg-red-100 text-red-600 px-1 rounded">High</span>
                              )}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 truncate">{message.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(message.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No recent messages</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;