import React, { useState, useEffect } from 'react';
import { Calendar, Users, MessageSquare, TrendingUp, Activity, Clock, Video } from 'lucide-react';
import MetricCard from '../MetricCard';
import ChartCard from '../ChartCard';
import { useAuth } from '../../hooks/useAuth';

interface DashboardProps {
  onViewChange: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const { doctor } = useAuth();
  
  // Static data that loads immediately
  const [dashboardData] = useState({
    todayAppointments: 3,
    newMessages: 5,
    totalPatients: 28,
    upcomingAppointments: [
      {
        id: 1,
        patient: { name: 'Sarah Johnson' },
        appointment_time: '10:00 AM',
        consultation_type: 'video',
        status: 'accepted',
        symptoms: 'Anxiety management follow-up'
      },
      {
        id: 2,
        patient: { name: 'Michael Chen' },
        appointment_time: '2:00 PM',
        consultation_type: 'video',
        status: 'accepted',
        symptoms: 'Depression therapy session'
      },
      {
        id: 3,
        patient: { name: 'Emma Davis' },
        appointment_time: '4:30 PM',
        consultation_type: 'video',
        status: 'accepted',
        symptoms: 'Initial consultation'
      }
    ],
    recentMessages: [
      {
        id: 'msg-1',
        title: 'New Appointment Request',
        message: 'James Wilson has requested an appointment for tomorrow at 3:00 PM',
        created_at: new Date().toISOString(),
        is_read: false,
        type: 'appointment'
      },
      {
        id: 'msg-2',
        title: 'Payment Received',
        message: 'Payment of $150 received from Sarah Johnson for today\'s session',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        is_read: false,
        type: 'payment'
      },
      {
        id: 'msg-3',
        title: 'Session Reminder',
        message: 'Reminder: You have a session with Michael Chen in 30 minutes',
        created_at: new Date(Date.now() - 7200000).toISOString(),
        is_read: true,
        type: 'reminder'
      }
    ]
  });

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

  return (
    <div className="p-6 space-y-6">
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
            change={`${dashboardData.todayAppointments} scheduled`}
            changeType="positive"
            icon={Calendar}
            color="blue"
          />
        </div>
        <div onClick={() => onViewChange('messages')} className="cursor-pointer">
          <MetricCard
            title="New Messages"
            value={dashboardData.newMessages.toString()}
            change={`${dashboardData.newMessages} unread`}
            changeType="positive"
            icon={MessageSquare}
            color="emerald"
          />
        </div>
        <div onClick={() => onViewChange('patients')} className="cursor-pointer">
          <MetricCard
            title="Total Patients"
            value={dashboardData.totalPatients.toString()}
            change="Active patients"
            changeType="positive"
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
            {dashboardData.upcomingAppointments.map((appointment) => (
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
                        {appointment.patient.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {appointment.appointment_time} • {appointment.consultation_type}
                      </p>
                      {appointment.symptoms && (
                        <p className="text-xs text-gray-500">{appointment.symptoms}</p>
                      )}
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
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
            {dashboardData.recentMessages.map((message) => (
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
                      <p className="text-sm text-gray-600 mt-1">{message.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(message.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;