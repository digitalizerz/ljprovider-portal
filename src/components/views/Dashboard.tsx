import React from 'react';
import { Calendar, Users, MessageSquare, TrendingUp, Activity, Clock, Video } from 'lucide-react';
import MetricCard from '../MetricCard';
import ChartCard from '../ChartCard';

interface DashboardProps {
  onViewChange: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const todayStats = {
    appointments: 4,
    newMessages: 7,
    totalPatients: 32,
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

  const upcomingAppointments = [
    { id: 1, patient: 'Sarah Johnson', time: '10:00 AM', type: 'Video Call', status: 'confirmed', concern: 'Anxiety Management' },
    { id: 2, patient: 'Michael Chen', time: '2:00 PM', type: 'In-Person', status: 'confirmed', concern: 'Depression Therapy' },
    { id: 3, patient: 'Emma Davis', time: '4:30 PM', type: 'Video Call', status: 'pending', concern: 'Trauma Counseling' },
    { id: 4, patient: 'James Wilson', time: '6:00 PM', type: 'Phone Call', status: 'confirmed', concern: 'Stress Management' },
  ];

  const recentMessages = [
    { id: 1, patient: 'John Doe', message: 'Thank you for the session yesterday. The breathing exercises really helped...', time: '2 hours ago', unread: true, priority: 'normal' },
    { id: 2, patient: 'Lisa Wang', message: 'I have a question about my medication dosage...', time: '4 hours ago', unread: true, priority: 'high' },
    { id: 3, patient: 'Robert Smith', message: 'Can we reschedule our appointment for next week?', time: '1 day ago', unread: false, priority: 'normal' },
    { id: 4, patient: 'Maria Garcia', message: 'I\'m feeling much better after our last session...', time: '2 days ago', unread: false, priority: 'normal' },
  ];

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
            value={todayStats.appointments.toString()}
            change="+1 from yesterday"
            changeType="positive"
            icon={Calendar}
            color="blue"
          />
        </div>
        <div onClick={() => onViewChange('messages')} className="cursor-pointer">
          <MetricCard
            title="New Messages"
            value={todayStats.newMessages.toString()}
            change="+4 unread"
            changeType="positive"
            icon={MessageSquare}
            color="emerald"
          />
        </div>
        <div onClick={() => onViewChange('patients')} className="cursor-pointer">
          <MetricCard
            title="Total Patients"
            value={todayStats.totalPatients.toString()}
            change="+4 this week"
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
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="glass-button rounded-lg p-4 hover:bg-white/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-lovejoy-100 rounded-full flex items-center justify-center">
                      {appointment.type === 'Video Call' ? (
                        <Video className="w-5 h-5 text-lovejoy-600" />
                      ) : (
                        <Users className="w-5 h-5 text-lovejoy-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-shadow-light">{appointment.patient}</p>
                      <p className="text-sm text-gray-600">{appointment.time} • {appointment.type}</p>
                      <p className="text-xs text-gray-500">{appointment.concern}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'confirmed' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
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
            {recentMessages.map((message) => (
              <div key={message.id} className="glass-button rounded-lg p-4 hover:bg-white/30 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">
                        {message.patient.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-800 text-shadow-light">{message.patient}</p>
                        {message.unread && (
                          <div className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            {message.priority === 'high' && (
                              <span className="text-xs bg-red-100 text-red-600 px-1 rounded">High</span>
                            )}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 truncate">{message.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{message.time}</p>
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