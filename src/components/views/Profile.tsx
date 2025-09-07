import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Award, Save, Edit, Camera } from 'lucide-react';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Dr. Sarah',
    lastName: 'Smith',
    email: 'dr.smith@lovejoy.health',
    phone: '+1 (555) 123-4567',
    licenseNumber: 'MD123456789',
    specialty: 'Clinical Psychology',
    experience: '8 years',
    education: 'PhD in Clinical Psychology, Harvard University',
    bio: 'Experienced clinical psychologist specializing in anxiety, depression, and trauma therapy. Passionate about helping individuals achieve mental wellness through evidence-based therapeutic approaches.',
    location: 'New York, NY',
    languages: 'English, Spanish',
    consultationFee: '150',
    availability: 'Monday - Friday, 9 AM - 6 PM'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // In real app, save to backend
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your professional profile and account settings</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <div className="glass-card rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 bg-lovejoy-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl font-bold text-lovejoy-600">
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-lovejoy-600 rounded-full flex items-center justify-center text-white hover:bg-lovejoy-700 transition-colors duration-300">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="text-gray-600 mb-2">{profileData.specialty}</p>
            <p className="text-sm text-gray-500">{profileData.location}</p>
            
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-lovejoy-600">28</p>
                  <p className="text-sm text-gray-600">Patients</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">4.9</p>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="xl:col-span-2 glass-card rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Profile Information</h3>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="primary-button px-4 py-2 rounded-lg text-sm font-medium flex items-center"
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="glass-input w-full px-3 py-2 rounded-lg disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="glass-input w-full px-3 py-2 rounded-lg disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="glass-input w-full px-3 py-2 rounded-lg disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="glass-input w-full px-3 py-2 rounded-lg disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-4">Professional Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={profileData.licenseNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="glass-input w-full px-3 py-2 rounded-lg disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                  <select
                    name="specialty"
                    value={profileData.specialty}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="glass-input w-full px-3 py-2 rounded-lg disabled:opacity-60"
                  >
                    <option value="Clinical Psychology">Clinical Psychology</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Counseling Psychology">Counseling Psychology</option>
                    <option value="Marriage & Family Therapy">Marriage & Family Therapy</option>
                    <option value="Social Work">Social Work</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={profileData.experience}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="glass-input w-full px-3 py-2 rounded-lg disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee ($)</label>
                  <input
                    type="number"
                    name="consultationFee"
                    value={profileData.consultationFee}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="glass-input w-full px-3 py-2 rounded-lg disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-4">Additional Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                  <input
                    type="text"
                    name="education"
                    value={profileData.education}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="glass-input w-full px-3 py-2 rounded-lg disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={4}
                    className="glass-input w-full px-3 py-2 rounded-lg disabled:opacity-60"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                    <input
                      type="text"
                      name="languages"
                      value={profileData.languages}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="glass-input w-full px-3 py-2 rounded-lg disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                    <input
                      type="text"
                      name="availability"
                      value={profileData.availability}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="glass-input w-full px-3 py-2 rounded-lg disabled:opacity-60"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="glass-card rounded-2xl shadow-lg border border-white/20 p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Verification Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-button rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-800">Identity Verified</p>
                <p className="text-sm text-gray-600">Government ID confirmed</p>
              </div>
            </div>
          </div>
          
          <div className="glass-button rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-800">License Verified</p>
                <p className="text-sm text-gray-600">Medical license confirmed</p>
              </div>
            </div>
          </div>
          
          <div className="glass-button rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-800">Background Check</p>
                <p className="text-sm text-gray-600">In progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;