import React, { useState } from 'react';
import { Search, Send, Paperclip, Smile, Phone, Video, MoreVertical } from 'lucide-react';

const Messages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'patient',
      content: 'Hi Dr. Smith, I wanted to follow up on our session yesterday. I\'ve been practicing the breathing exercises.',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: 2,
      sender: 'provider',
      content: 'Hello Sarah! I\'m so glad you reached out. How are you feeling today? Have the breathing exercises been helping with your anxiety?',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: 3,
      sender: 'patient',
      content: 'Much better actually! The breathing exercises you taught me really helped when I felt anxious last night. I was able to calm down much faster than usual.',
      timestamp: '10:35 AM',
      type: 'text'
    },
    {
      id: 4,
      sender: 'provider',
      content: 'That\'s wonderful to hear! I\'m so proud of your progress. Consistency with those exercises will make a big difference. Keep practicing them daily, and remember you can always reach out if you need support.',
      timestamp: '10:37 AM',
      type: 'text'
    },
    {
      id: 5,
      sender: 'patient',
      content: 'I will! Should I continue with the same routine, or would you like me to try something different? Also, I wanted to ask about the mindfulness app you mentioned.',
      timestamp: '10:40 AM',
      type: 'text'
    },
    {
      id: 6,
      sender: 'provider',
      content: 'Let\'s stick with the current routine for now since it\'s working well. For the mindfulness app, I recommend "Calm" or "Headspace" - both have excellent anxiety-focused programs. We can discuss your experience with them in our next session.',
      timestamp: '10:45 AM',
      type: 'text'
    }
  ]);
  const [conversations, setConversations] = useState([
    {
      id: 1,
      patient: 'Sarah Johnson',
      lastMessage: 'Thank you for the session yesterday. The breathing exercises really helped with my anxiety.',
      timestamp: '2 hours ago',
      unread: 3,
      avatar: null,
      online: true,
      priority: 'normal',
      riskLevel: 'low'
    },
    {
      id: 2,
      patient: 'Michael Chen',
      lastMessage: 'I\'ve been feeling more depressed lately. Can we schedule an earlier session?',
      timestamp: '4 hours ago',
      unread: 2,
      avatar: null,
      online: false,
      priority: 'high',
      riskLevel: 'medium'
    },
    {
      id: 3,
      patient: 'Emma Davis',
      lastMessage: 'I had another flashback last night. The grounding techniques helped but I\'m still shaken.',
      timestamp: '1 day ago',
      unread: 1,
      avatar: null,
      online: true,
      priority: 'high',
      riskLevel: 'high'
    },
    {
      id: 4,
      patient: 'John Smith',
      lastMessage: 'The meditation techniques are really helping with my stress levels. Thank you!',
      timestamp: '2 days ago',
      unread: 0,
      avatar: null,
      online: false,
      priority: 'normal',
      riskLevel: 'low'
    },
    {
      id: 5,
      patient: 'James Wilson',
      lastMessage: 'Work has been overwhelming again. I think I need to adjust my coping strategies.',
      timestamp: '3 days ago',
      unread: 0,
      avatar: null,
      online: true,
      priority: 'medium',
      riskLevel: 'low'
    }
  ]);


  const currentConversation = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'provider' as const,
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text' as const
      };
      
      setMessages(prev => [...prev, newMsg]);
      
      // Update conversation last message and timestamp
      setConversations(prev => prev.map(conv => 
        conv.id === selectedConversation 
          ? { ...conv, lastMessage: newMessage.trim(), timestamp: 'Just now', unread: 0 }
          : conv
      ));
      
      setNewMessage('');
    }
  };

  const handlePhoneCall = () => {
    if (currentConversation) {
      alert(`Initiating phone call with ${currentConversation.patient}...`);
      // In real app, integrate with phone system
    }
  };

  const handleVideoCall = () => {
    if (currentConversation) {
      alert(`Starting video call with ${currentConversation.patient}...`);
      // In real app, launch video call interface
    }
  };

  const handleMoreOptions = () => {
    if (currentConversation) {
      const options = [
        'View Patient Profile',
        'Schedule Appointment',
        'Mark as Priority',
        'Archive Conversation',
        'Export Messages'
      ];
      
      const choice = prompt(`Choose an option for ${currentConversation.patient}:\n\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}`);
      
      if (choice) {
        const optionIndex = parseInt(choice) - 1;
        if (optionIndex >= 0 && optionIndex < options.length) {
          alert(`Selected: ${options[optionIndex]}`);
          // In real app, implement these features
        }
      }
    }
  };

  const handleAttachment = () => {
    alert('File attachment feature - In real app, this would open file picker');
    // In real app, implement file upload
  };

  const handleEmoji = () => {
    const emojis = ['😊', '👍', '❤️', '🙏', '💪', '🌟', '✨', '🎉'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    setNewMessage(prev => prev + emoji);
  };

  const markConversationAsRead = (conversationId: number) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, unread: 0 }
        : conv
    ));
  };

  const filteredConversations = conversations.filter(conv =>
    conv.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Communicate securely with your patients</p>
      </div>

      <div className="glass-card rounded-2xl shadow-lg border border-white/20 h-[calc(100vh-200px)]">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-white/20 flex flex-col">
            <div className="p-4 border-b border-white/20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass-input pl-10 pr-4 py-2 rounded-lg w-full"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => {
                    setSelectedConversation(conversation.id);
                    markConversationAsRead(conversation.id);
                  }}
                  className={`p-4 border-b border-white/10 cursor-pointer transition-all duration-200 ${
                    selectedConversation === conversation.id
                      ? 'bg-white/20 border-l-4 border-l-lovejoy-500'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">
                          {conversation.patient.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 truncate">{conversation.patient}</h3>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-1">
                            {conversation.priority === 'high' && (
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Urgent</span>
                            )}
                            {conversation.riskLevel === 'high' && (
                              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">High Risk</span>
                            )}
                          </div>
                          <span className="bg-lovejoy-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {conversation.unread}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {currentConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-white/20 glass-header">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">
                            {currentConversation.patient.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {currentConversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{currentConversation.patient}</h3>
                        <p className="text-sm text-gray-500">
                          {currentConversation.online ? 'Online' : 'Last seen 2 hours ago'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={handlePhoneCall}
                        className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
                        title="Start Phone Call"
                      >
                        <Phone className="w-5 h-5 text-gray-600" />
                      </button>
                      <button 
                        onClick={handleVideoCall}
                        className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
                        title="Start Video Call"
                      >
                        <Video className="w-5 h-5 text-gray-600" />
                      </button>
                      <button 
                        onClick={handleMoreOptions}
                        className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
                        title="More Options"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'provider' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.sender === 'provider'
                            ? 'bg-lovejoy-500 text-white'
                            : 'glass-button bg-white/30'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'provider' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Crisis Support Notice */}
                  {currentConversation?.riskLevel === 'high' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mx-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <p className="text-sm text-red-800 font-medium">High-risk patient - Monitor closely</p>
                      </div>
                      <p className="text-xs text-red-600 mt-1">Crisis hotline: 988 | Emergency: 911</p>
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-white/20">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={handleAttachment}
                      className="glass-button p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
                      title="Attach File"
                    >
                      <Paperclip className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="glass-input w-full px-4 py-3 pr-12 rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={handleEmoji}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        title="Add Emoji"
                      >
                        <Smile className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="primary-button p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-500">Choose a patient from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
