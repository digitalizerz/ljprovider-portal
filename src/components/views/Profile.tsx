import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Award, Save, Edit, Camera, Upload } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const Profile: React.FC = () => {
  const { doctor, token, updateProfile, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    specialty: '',
    experience: '',
    education: '',
    bio: '',
    location: '',
    languages: '',
    consultationFee: '',
    availability: ''
  });

  // Populate form with real doctor data
  useEffect(() => {
    if (doctor) {
      setProfileData({
        firstName: doctor.first_name || '',
        lastName: doctor.last_name || '',
        email: doctor.email || '',
        phone: doctor.mobile || '',
        licenseNumber: doctor.license_number || '',
        specialty: doctor.category_name || '',
        experience: doctor.experience_years?.toString() || '',
        education: doctor.education || '',
        bio: doctor.bio || '',
        location: doctor.location || '',
        languages: doctor.languages?.join(', ') || 'English',
        consultationFee: doctor.consultation_fee?.toString() || '',
        availability: doctor.availability || 'Monday - Friday, 9 AM - 6 PM'
      });
    }
  }, [doctor]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Prepare data for API
      const updateData = {
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        email: profileData.email,
        mobile: profileData.phone,
        experience_years: parseInt(profileData.experience) || 0,
        consultation_fee: parseFloat(profileData.consultationFee) || 0,
        bio: profileData.bio,
        education: profileData.education,
        languages: profileData.languages.split(',').map(lang => lang.trim()),
      };

      await updateProfile(updateData);
      setIsEditing(false);
      
      // Refresh profile data
      await refreshProfile();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!doctor) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your professional profile and account settings</p>
      </div>

      {error && (
        <ErrorMessage message={error} onDismiss={() => setError(null)} className="mb-6" />
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <div className="glass-card rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 bg-lovejoy-100 rounded-full flex items-center justify-center mx-auto">
                {doctor.profile_image ? (
                  <img 
                    src={doctor.profile_image} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-lovejoy-600">
                    {doctor.first_name?.[0]}{doctor.last_name?.[0]}
                  </span>
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-lovejoy-600 rounded-full flex items-center justify-center text-white hover:bg-lovejoy-700 transition-colors duration-300">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Dr. {doctor.first_name} {doctor.last_name}
            </h2>
            <p className="text-gray-600 mb-2">{doctor.category_name || 'Healthcare Provider'}</p>
            <p className="text-sm text-gray-500">{doctor.location || 'Location not specified'}</p>
            
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-lovejoy-600">{doctor.total_patients || 0}</p>
                  <p className="text-sm text-gray-600">Patients</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">{doctor.rating || '4.9'}</p>
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
              disabled={isLoading}
              className="primary-button px-4 py-2 rounded-lg text-sm font-medium flex items-center disabled:opacity-50"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" color="white" className="mr-2" />
              ) : isEditing ? (
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
                  <input
                    type="text"
                    name="specialty"
                    value={profileData.specialty}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="glass-input w-full px-3 py-2 rounded-lg disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                  <input
                    type="number"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education & Credentials</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
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
              <div className={`w-3 h-3 rounded-full ${doctor.is_verified ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
              <div>
                <p className="font-medium text-gray-800">Identity Verified</p>
                <p className="text-sm text-gray-600">
                  {doctor.is_verified ? 'Government ID confirmed' : 'Verification pending'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="glass-button rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${doctor.license_verified ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
              <div>
                <p className="font-medium text-gray-800">License Verified</p>
                <p className="text-sm text-gray-600">
                  {doctor.license_verified ? 'Medical license confirmed' : 'License verification pending'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="glass-button rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${doctor.background_check ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
              <div>
                <p className="font-medium text-gray-800">Background Check</p>
                <p className="text-sm text-gray-600">
                  {doctor.background_check ? 'Completed' : 'In progress'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Stats */}
      <div className="glass-card rounded-2xl shadow-lg border border-white/20 p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-lovejoy-600">{doctor.total_appointments || 0}</p>
            <p className="text-sm text-gray-600">Total Sessions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">{doctor.total_reviews || 0}</p>
            <p className="text-sm text-gray-600">Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gold-600">${doctor.wallet_balance || 0}</p>
            <p className="text-sm text-gray-600">Wallet Balance</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{doctor.experience_years || 0}</p>
            <p className="text-sm text-gray-600">Years Experience</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;