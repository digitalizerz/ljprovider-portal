import React, { useState } from 'react';
import { ArrowLeft, Heart, Mail, Phone, Calendar, DollarSign, Activity, CreditCard, User, MapPin } from 'lucide-react';
import Sidebar from '../Sidebar';
import Header from '../Header';

interface PatientProfileProps {
  patientId: string;
  onBack: () => void;
  onLogout: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patientId, onBack, onLogout, currentView, onViewChange }) => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  // Mock patient data - in real app, fetch based on patientId
  const patient = {
    id: patientId,
    fullname: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    avatar: null,
    joinDate: '2024-08-15',
    lastSession: '2024-12-18',
    nextAppointment: '2024-12-22 10:00 AM',
    status: 'Active',
    totalSessions: 12,
    completedSessions: 10,
    cancelledSessions: 2,
    totalSpent: 1800,
    location: 'New York, NY',
    age: 28,
    gender: 'Female',
    emergencyContact: 'John Johnson (Husband) - (555) 987-6543',
    insuranceProvider: 'Blue Cross Blue Shield',
    primaryConcerns: ['Anxiety', 'Depression', 'Work Stress'],
    medications: ['Sertraline 50mg', 'Lorazepam 0.5mg (as needed)'],
    allergies: 'None reported'
  };

  const appointments = [
    { id: 1, date: '2024-12-22', time: '10:00 AM', type: 'Video Call', status: 'Scheduled', notes: 'Follow-up session for anxiety management' },
    { id: 2, date: '2024-12-18', time: '10:00 AM', type: 'Video Call', status: 'Completed', notes: 'Discussed coping strategies for work stress' },
    { id: 3, date: '2024-12-11', time: '10:00 AM', type: 'Video Call', status: 'Completed', notes: 'Initial assessment and treatment planning' },
  ];

  const sessionNotes = [
    { id: 1, date: '2024-12-18', session: 'Session #10', notes: 'Patient showed significant improvement in managing anxiety symptoms. Discussed new coping strategies for workplace stress. Homework assigned: daily mindfulness practice.' },
    { id: 2, date: '2024-12-11', session: 'Session #9', notes: 'Continued work on cognitive behavioral techniques. Patient reports better sleep patterns. Discussed medication compliance and side effects.' },
  ];

  const tabs = [
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'notes', label: 'Session Notes', icon: Activity },
    { id: 'medical', label: 'Medical Info', icon: Heart },
  ];

  return (
    <div className="flex h-screen animated-bg">
      <Sidebar currentView={currentView} onViewChange={onViewChange} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={onLogout} />
        <div className="flex-1 overflow-y-auto">
          {/* Breadcrumb */}
          <div className="glass-header px-6 py-4">
            <button
              onClick={onBack}
              className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-150"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Patients
            </button>
          </div>

          <div className="p-6">
            {/* Patient Info Card */}
            <div className="glass-card rounded-xl shadow-lg mb-6">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                      {patient.avatar ? (
                        <img src={patient.avatar} alt="" className="w-20 h-20 rounded-full object-cover" />
                      ) : (
                        <span className="text-2xl font-bold text-blue-600">
                          {patient.fullname.split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-1 text-shadow">{patient.fullname}</h2>
                      <p className="text-gray-600 mb-2 text-shadow-light">{patient.email}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Patient since {new Date(patient.joinDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Activity className="w-4 h-4 mr-1" />
                          Last session {new Date(patient.lastSession).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="glass-button bg-lovejoy-500/20 hover:bg-lovejoy-500/30 text-lovejoy-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-lovejoy-300">
                      <button 
                        onClick={() => setShowMessageModal(true)}
                        className="glass-button bg-lovejoy-500/20 hover:bg-lovejoy-500/30 text-lovejoy-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-lovejoy-300"
                      >
                        Send Message
                      </button>
                    </button>
                    <button className="glass-button bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-emerald-300">
                      <button 
                        onClick={() => setShowScheduleModal(true)}
                        className="glass-button bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-emerald-300"
                      >
                        Schedule Session
                      </button>
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="glass-button rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 text-shadow-light">Total Sessions</p>
                        <p className="text-2xl font-bold text-gray-800 text-shadow">{patient.totalSessions}</p>
                      </div>
                      <Calendar className="w-8 h-8 text-lovejoy-500" />
                    </div>
                  </div>
                  <div className="glass-button rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 text-shadow-light">Completed</p>
                        <p className="text-2xl font-bold text-emerald-600">{patient.completedSessions}</p>
                      </div>
                      <Activity className="w-8 h-8 text-emerald-500" />
                    </div>
                  </div>
                  <div className="glass-button rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 text-shadow-light">Cancelled</p>
                        <p className="text-2xl font-bold text-red-600">{patient.cancelledSessions}</p>
                      </div>
                      <CreditCard className="w-8 h-8 text-red-500" />
                    </div>
                  </div>
                  <div className="glass-button rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 text-shadow-light">Total Paid</p>
                        <p className="text-2xl font-bold text-gray-800 text-shadow">${patient.totalSpent}</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-gold-500" />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 text-shadow-light">{patient.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 text-shadow-light">{patient.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 text-shadow-light">{patient.age} years old, {patient.gender}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="glass-card rounded-xl shadow-lg">
              <div className="border-b border-white/20">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                          activeTab === tab.id
                            ? 'border-lovejoy-500 text-lovejoy-700 text-shadow'
                            : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-400'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'appointments' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 text-shadow">Appointment History</h3>
                    <div className="space-y-4">
                      {appointments.map((appointment) => (
                        <div key={appointment.id} className="glass-button rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-lovejoy-100 rounded-full flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-lovejoy-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 text-shadow-light">
                                  {appointment.date} at {appointment.time}
                                </p>
                                <p className="text-sm text-gray-600">{appointment.type}</p>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              appointment.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                              appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {appointment.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 ml-13">{appointment.notes}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 text-shadow">Session Notes</h3>
                    <div className="space-y-4">
                      {sessionNotes.map((note) => (
                        <div key={note.id} className="glass-button rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-800 text-shadow-light">{note.session}</h4>
                            <span className="text-sm text-gray-500">{new Date(note.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{note.notes}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'medical' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 text-shadow">Medical Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass-button rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-3">Primary Concerns</h4>
                        <div className="flex flex-wrap gap-2">
                          {patient.primaryConcerns.map((concern, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {concern}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="glass-button rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-3">Current Medications</h4>
                        <ul className="space-y-1">
                          {patient.medications.map((medication, index) => (
                            <li key={index} className="text-sm text-gray-700">• {medication}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="glass-button rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-3">Insurance Provider</h4>
                        <p className="text-gray-700">{patient.insuranceProvider}</p>
                      </div>

                      <div className="glass-button rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-3">Emergency Contact</h4>
                        <p className="text-gray-700">{patient.emergencyContact}</p>
                      </div>

                      <div className="glass-button rounded-lg p-4 md:col-span-2">
                        <h4 className="font-medium text-gray-800 mb-3">Allergies</h4>
                        <p className="text-gray-700">{patient.allergies}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Session Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Schedule Session</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
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
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="video">Video Call</option>
                  <option value="phone">Phone Call</option>
                  <option value="inperson">In-Person</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  rows={3}
                  placeholder="Any specific topics or concerns to address..."
                ></textarea>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    // In real app, submit to backend
                    alert('Session scheduled successfully!');
                    setShowScheduleModal(false);
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Schedule Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Send Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Send Message to {patient.fullname}</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="normal">Normal</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Message subject..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  rows={6}
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="followUp" className="rounded text-blue-600 focus:ring-blue-500" />
                <label htmlFor="followUp" className="text-sm text-gray-700">
                  Request follow-up response
                </label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    // In real app, submit to backend
                    alert('Message sent successfully!');
                    setShowMessageModal(false);
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;