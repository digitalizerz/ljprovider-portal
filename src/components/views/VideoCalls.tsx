import React, { useState } from 'react';
import { Video, Phone, Mic, MicOff, VideoOff, Monitor, Users, Calendar, Clock } from 'lucide-react';

const VideoCalls: React.FC = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showInstantCallModal, setShowInstantCallModal] = useState(false);
  const [showGroupSessionModal, setShowGroupSessionModal] = useState(false);
  const [showScreenShareModal, setShowScreenShareModal] = useState(false);

  const upcomingCalls = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      time: '10:00 AM',
      date: 'Today',
      type: 'Therapy Session',
      duration: '50 min'
    },
    {
      id: 2,
      patient: 'Michael Chen',
      time: '2:00 PM',
      date: 'Today',
      type: 'Follow-up',
      duration: '30 min'
    },
    {
      id: 3,
      patient: 'Emma Davis',
      time: '4:30 PM',
      date: 'Today',
      type: 'Initial Consultation',
      duration: '60 min'
    }
  ];

  const recentCalls = [
    {
      id: 1,
      patient: 'John Smith',
      date: 'Yesterday',
      time: '3:00 PM',
      duration: '45 min',
      status: 'Completed'
    },
    {
      id: 2,
      patient: 'Lisa Wang',
      date: 'Dec 18',
      time: '11:00 AM',
      duration: '50 min',
      status: 'Completed'
    },
    {
      id: 3,
      patient: 'Robert Davis',
      date: 'Dec 17',
      time: '2:30 PM',
      duration: '30 min',
      status: 'Missed'
    }
  ];

  if (isInCall) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex flex-col">
        {/* Video Area */}
        <div className="flex-1 relative">
          {/* Main Video */}
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold">SJ</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Sarah Johnson</h3>
              <p className="text-gray-300">Connected • 15:32</p>
            </div>
          </div>

          {/* Self Video */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gray-600 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-lovejoy-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg font-bold">DS</span>
                </div>
                <p className="text-sm">You</p>
              </div>
            </div>
          </div>

          {/* Call Info */}
          <div className="absolute top-4 left-4 glass-card rounded-lg p-3">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Therapy Session</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 bg-gray-800/50 backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition-all duration-300 ${
                isMuted 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {isMuted ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-4 rounded-full transition-all duration-300 ${
                isVideoOff 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {isVideoOff ? (
                <VideoOff className="w-6 h-6 text-white" />
              ) : (
                <Video className="w-6 h-6 text-white" />
              )}
            </button>

            <button className="p-4 rounded-full bg-gray-600 hover:bg-gray-700 transition-all duration-300">
              <Monitor className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={() => setIsInCall(false)}
              className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-300"
            >
              <Phone className="w-6 h-6 text-white transform rotate-135" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Calls</h1>
        <p className="text-gray-600">Conduct secure video sessions with your patients</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Calls */}
        <div className="glass-card rounded-2xl shadow-lg border border-white/20">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="p-2 glass-button rounded-lg mr-3 glow">
                <Calendar className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 text-shadow">Today's Sessions</h3>
            </div>
            
            <div className="space-y-4">
              {upcomingCalls.map((call) => (
                <div key={call.id} className="glass-button rounded-lg p-4 hover:bg-white/30 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">
                          {call.patient.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-shadow-light">{call.patient}</p>
                        <p className="text-sm text-gray-600">{call.time} • {call.type}</p>
                        <p className="text-xs text-gray-500">{call.duration}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsInCall(true)}
                      className="primary-button px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Calls */}
        <div className="glass-card rounded-2xl shadow-lg border border-white/20">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="p-2 glass-button rounded-lg mr-3 glow">
                <Clock className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 text-shadow">Recent Sessions</h3>
            </div>
            
            <div className="space-y-4">
              {recentCalls.map((call) => (
                <div key={call.id} className="glass-button rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-600">
                          {call.patient.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-shadow-light">{call.patient}</p>
                        <p className="text-sm text-gray-600">{call.date} at {call.time}</p>
                        <p className="text-xs text-gray-500">{call.duration}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      call.status === 'Completed' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {call.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 glass-card rounded-2xl shadow-lg border border-white/20">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-shadow">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => setShowInstantCallModal(true)}
              className="glass-button rounded-lg p-4 hover:bg-white/30 transition-all duration-300 text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Start Instant Call</p>
                  <p className="text-sm text-gray-600">Begin an unscheduled session</p>
                </div>
              </div>
            </button>

            <button 
              onClick={() => setShowGroupSessionModal(true)}
              className="glass-button rounded-lg p-4 hover:bg-white/30 transition-all duration-300 text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Group Session</p>
                  <p className="text-sm text-gray-600">Host a group therapy session</p>
                </div>
              </div>
            </button>

            <button 
              onClick={() => setShowScreenShareModal(true)}
              className="glass-button rounded-lg p-4 hover:bg-white/30 transition-all duration-300 text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Screen Share</p>
                  <p className="text-sm text-gray-600">Share resources with patients</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Instant Call Modal */}
      {showInstantCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Start Instant Call</h3>
            <p className="text-gray-600 mb-6">Begin an unscheduled video session with a patient</p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Choose a patient...</option>
                  <option value="1">Sarah Johnson</option>
                  <option value="2">Michael Chen</option>
                  <option value="3">Emma Davis</option>
                  <option value="4">James Wilson</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="emergency">Emergency Check-in (Free)</option>
                  <option value="brief">Brief Consultation (30 min) - $75</option>
                  <option value="standard">Standard Session (50 min) - $150</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Call</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  rows={3}
                  placeholder="Brief description of the reason for this instant call..."
                ></textarea>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="recordSession" className="rounded text-blue-600 focus:ring-blue-500" />
                <label htmlFor="recordSession" className="text-sm text-gray-700">
                  Record session for clinical notes
                </label>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInstantCallModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Initiating instant call... Patient will receive notification.');
                    setShowInstantCallModal(false);
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Start Call
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Group Session Modal */}
      {showGroupSessionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Host Group Session</h3>
            <p className="text-gray-600 mb-6">Create a group therapy session with multiple participants</p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Title</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Anxiety Support Group, Couples Therapy..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="support">Support Group (60 min) - $50/person</option>
                  <option value="couples">Couples Therapy (60 min) - $200/couple</option>
                  <option value="family">Family Therapy (75 min) - $250/family</option>
                  <option value="workshop">Educational Workshop (90 min) - $75/person</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Patients</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3">
                    {['Sarah Johnson', 'Michael Chen', 'Emma Davis', 'James Wilson', 'Maria Garcia'].map((patient) => (
                      <label key={patient} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm text-gray-700">{patient}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">External Participants</label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">Generate invite link for external participants</span>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-blue-800 mb-2">
                        <strong>Invite Link:</strong> Share this secure link with external participants
                      </p>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="text" 
                          value="https://lovejoy.health/join/abc123xyz"
                          readOnly
                          className="flex-1 text-xs px-2 py-1 bg-white border border-blue-300 rounded"
                        />
                        <button 
                          type="button"
                          className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          onClick={() => navigator.clipboard.writeText('https://lovejoy.health/join/abc123xyz')}
                        >
                          Copy
                        </button>
                      </div>
                      <p className="text-xs text-blue-600 mt-1">
                        Link expires after session ends. HIPAA-compliant secure connection.
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Email invites (optional)</label>
                      <textarea 
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                        rows={2}
                        placeholder="Enter email addresses separated by commas..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
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
                    <option value="10:00">10:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Description</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  rows={3}
                  placeholder="Describe the focus and goals of this group session..."
                ></textarea>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-800 mb-2">Session Settings</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Record session for clinical notes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Allow participants to share screen</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Enable waiting room</span>
                  </label>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowGroupSessionModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Group session scheduled! Invitations will be sent to participants.');
                    setShowGroupSessionModal(false);
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Schedule Group Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Screen Share Modal */}
      {showScreenShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Screen Share Session</h3>
            <p className="text-gray-600 mb-6">Share educational resources and materials with patients</p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Choose a patient...</option>
                  <option value="1">Sarah Johnson</option>
                  <option value="2">Michael Chen</option>
                  <option value="3">Emma Davis</option>
                  <option value="4">James Wilson</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Share Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="educational">Educational Materials</option>
                  <option value="exercises">Therapy Exercises</option>
                  <option value="assessment">Assessment Tools</option>
                  <option value="homework">Homework Assignment</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Duration</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  rows={3}
                  placeholder="Describe what you'll be sharing and the educational goals..."
                ></textarea>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">Allow patient to control screen</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">Record session for patient reference</span>
                </label>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowScreenShareModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Screen share session initiated! Patient will receive invitation.');
                    setShowScreenShareModal(false);
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Start Screen Share
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCalls;