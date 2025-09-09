import React, { useState } from 'react';
import { Heart, Lock, Mail, UserCheck, ArrowRight, ArrowLeft, Check, User, FileText, Shield, CreditCard } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpStep, setSignUpStep] = useState(1);
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    specialty: '',
    phone: '',
    experience: '',
    education: '',
    bio: '',
    consultationFee: '',
    acceptsInsurance: false,
    languages: [] as string[],
    certifications: [] as string[]
  });

  const specialists = [
    { id: 'PSYCHIATRIST', name: 'Psychiatrist', icon: '🧠', description: 'Medical doctor specializing in mental health' },
    { id: 'NURSE_PRACTITIONER', name: 'Nurse Practitioner', icon: '👩‍⚕️', description: 'Advanced practice registered nurse' },
    { id: 'SOCIAL_WORKER', name: 'Social Worker', icon: '🤝', description: 'Licensed clinical social worker' },
    { id: 'ADDICTION_COUNSELOR', name: 'Addiction Counselor', icon: '🔄', description: 'Substance abuse and addiction specialist' },
    { id: 'THERAPIST', name: 'Therapist (LPC, LCSW, LMFT)', icon: '💬', description: 'Licensed professional counselor' },
    { id: 'MENTAL_HEALTH_COACH', name: 'Mental Health Coach', icon: '🎯', description: 'Certified mental health coach' },
    { id: 'PROFESSIONAL_COUNSELOR', name: 'Professional Counselor', icon: '👥', description: 'Licensed professional counselor' },
    { id: 'PEER_SUPPORT_SPECIALIST', name: 'Peer Support Specialist', icon: '🤲', description: 'Certified peer support specialist' },
    { id: 'PASTORAL_COUNSELOR', name: 'Pastoral Counselor', icon: '⛪', description: 'Faith-based counseling specialist' },
    { id: 'PSYCHOLOGIST', name: 'Psychologist', icon: '🧠', description: 'Licensed clinical psychologist' },
    { id: 'ART_MUSIC_THERAPIST', name: 'Art/Music Therapist', icon: '🎨', description: 'Creative arts therapy specialist' }
  ];

  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Mandarin', 'Arabic', 'Hindi', 'Other'];
  const certifications = ['CBT', 'DBT', 'EMDR', 'Trauma-Informed Care', 'Family Therapy', 'Group Therapy', 'Addiction Counseling', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Please enter your email and password');
      return;
    }
    
    // Use real Laravel API login
    setIsLoading(true);
    
    // Call the real login function (this would be passed from App.tsx)
    // For now, simulate success for testing
    setTimeout(() => {
      console.log('🧪 Testing with credentials:', { email, password });
      if (email === 'business@lovejoy.health' && password === '16makaita') {
        console.log('✅ Test credentials match, proceeding with login');
        onLogin();
      } else {
        console.log('❌ Credentials do not match test account');
        alert('Please use the test credentials: business@lovejoy.health / 16makaita');
      }
      setIsLoading(false);
    }, 1000);
  };
  
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpStep < 4) {
      setSignUpStep(signUpStep + 1);
    } else {
      // Final submission
      alert('Application submitted for verification! You will receive an email once approved.');
      setIsSignUp(false);
      setSignUpStep(1);
    }
  };

  const handlePrevStep = () => {
    if (signUpStep > 1) {
      setSignUpStep(signUpStep - 1);
    }
  };

  const handleSpecialtySelect = (specialtyId: string) => {
    setSignUpData({...signUpData, specialty: specialtyId});
  };

  const handleLanguageToggle = (language: string) => {
    const currentLanguages = signUpData.languages;
    if (currentLanguages.includes(language)) {
      setSignUpData({
        ...signUpData,
        languages: currentLanguages.filter(l => l !== language)
      });
    } else {
      setSignUpData({
        ...signUpData,
        languages: [...currentLanguages, language]
      });
    }
  };

  const handleCertificationToggle = (certification: string) => {
    const currentCertifications = signUpData.certifications;
    if (currentCertifications.includes(certification)) {
      setSignUpData({
        ...signUpData,
        certifications: currentCertifications.filter(c => c !== certification)
      });
    } else {
      setSignUpData({
        ...signUpData,
        certifications: [...currentCertifications, certification]
      });
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: 'Personal Info', icon: User },
      { number: 2, title: 'Specialty', icon: Heart },
      { number: 3, title: 'Professional', icon: FileText },
      { number: 4, title: 'Verification', icon: Shield }
    ];

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = signUpStep === step.number;
          const isCompleted = signUpStep > step.number;
          
          return (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                isCompleted 
                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                  : isActive 
                    ? 'bg-lovejoy-600 border-lovejoy-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <div className="ml-2 mr-4">
                <p className={`text-sm font-medium ${isActive ? 'text-lovejoy-600' : 'text-gray-500'}`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mr-4 ${isCompleted ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h3>
        <p className="text-gray-600">Let's start with your basic information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            value={signUpData.firstName}
            onChange={(e) => setSignUpData({...signUpData, firstName: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lovejoy-500 focus:border-lovejoy-500 bg-white text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            value={signUpData.lastName}
            onChange={(e) => setSignUpData({...signUpData, lastName: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lovejoy-500 focus:border-lovejoy-500 bg-white text-gray-900"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          value={signUpData.email}
          onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lovejoy-500 focus:border-lovejoy-500 bg-white text-gray-900"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <input
          type="tel"
          value={signUpData.phone}
          onChange={(e) => setSignUpData({...signUpData, phone: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lovejoy-500 focus:border-lovejoy-500 bg-white text-gray-900"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={signUpData.password}
            onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lovejoy-500 focus:border-lovejoy-500 bg-white text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            value={signUpData.confirmPassword}
            onChange={(e) => setSignUpData({...signUpData, confirmPassword: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lovejoy-500 focus:border-lovejoy-500 bg-white text-gray-900"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Specialty</h3>
        <p className="text-gray-600">Select the specialty that best describes your practice</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {specialists.map((specialist) => (
          <button
            key={specialist.id}
            type="button"
            onClick={() => handleSpecialtySelect(specialist.id)}
            className={`p-4 text-left border-2 rounded-xl transition-all duration-300 hover:scale-105 ${
              signUpData.specialty === specialist.id
                ? 'border-lovejoy-500 bg-lovejoy-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{specialist.icon}</div>
              <div>
                <h4 className="font-semibold text-gray-800">{specialist.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{specialist.description}</p>
              </div>
            </div>
            {signUpData.specialty === specialist.id && (
              <div className="mt-2 flex justify-end">
                <div className="w-6 h-6 bg-lovejoy-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Professional Details</h3>
        <p className="text-gray-600">Tell us about your professional background</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
          <input
            type="text"
            value={signUpData.licenseNumber}
            onChange={(e) => setSignUpData({...signUpData, licenseNumber: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lovejoy-500 focus:border-lovejoy-500 bg-white text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
          <input
            type="number"
            value={signUpData.experience}
            onChange={(e) => setSignUpData({...signUpData, experience: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lovejoy-500 focus:border-lovejoy-500 bg-white text-gray-900"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Education & Credentials</label>
        <input
          type="text"
          value={signUpData.education}
          onChange={(e) => setSignUpData({...signUpData, education: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lovejoy-500 focus:border-lovejoy-500 bg-white text-gray-900"
          placeholder="e.g., PhD in Clinical Psychology, Harvard University"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
        <textarea
          value={signUpData.bio}
          onChange={(e) => setSignUpData({...signUpData, bio: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lovejoy-500 focus:border-lovejoy-500 bg-white text-gray-900"
          rows={4}
          placeholder="Describe your approach, specializations, and what makes you unique..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee (USD)</label>
        <input
          type="number"
          value={signUpData.consultationFee}
          onChange={(e) => setSignUpData({...signUpData, consultationFee: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lovejoy-500 focus:border-lovejoy-500 bg-white text-gray-900"
          placeholder="150"
          required
        />
      </div>

      <div>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={signUpData.acceptsInsurance}
            onChange={(e) => setSignUpData({...signUpData, acceptsInsurance: e.target.checked})}
            className="w-5 h-5 text-lovejoy-600 rounded focus:ring-lovejoy-500"
          />
          <span className="text-sm font-medium text-gray-700">I accept insurance payments</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Languages Spoken</label>
        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <button
              key={language}
              type="button"
              onClick={() => handleLanguageToggle(language)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                signUpData.languages.includes(language)
                  ? 'bg-lovejoy-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Certifications & Specializations</label>
        <div className="flex flex-wrap gap-2">
          {certifications.map((certification) => (
            <button
              key={certification}
              type="button"
              onClick={() => handleCertificationToggle(certification)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                signUpData.certifications.includes(certification)
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {certification}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Review & Submit</h3>
        <p className="text-gray-600">Please review your information before submitting</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium text-gray-800">{signUpData.firstName} {signUpData.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium text-gray-800">{signUpData.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium text-gray-800">{signUpData.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Specialty</p>
            <p className="font-medium text-gray-800">
              {specialists.find(s => s.id === signUpData.specialty)?.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">License Number</p>
            <p className="font-medium text-gray-800">{signUpData.licenseNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Experience</p>
            <p className="font-medium text-gray-800">{signUpData.experience} years</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600">Education</p>
            <p className="font-medium text-gray-800">{signUpData.education}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600">Languages</p>
            <p className="font-medium text-gray-800">{signUpData.languages.join(', ')}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600">Certifications</p>
            <p className="font-medium text-gray-800">{signUpData.certifications.join(', ')}</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">Next Steps</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Your application will be reviewed within 2-3 business days</li>
          <li>• We'll verify your license and credentials</li>
          <li>• You'll receive an email once approved to complete your profile</li>
          <li>• Background check may be required for final approval</li>
        </ul>
      </div>
    </div>
  );

  if (isSignUp) {
    return (
      <div className="min-h-screen flex items-center justify-center animated-bg p-6">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-lovejoy-600 to-lovejoy-700 p-8 text-white">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 mr-4 bg-gold-500 rounded-lg flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">LOVEJOY HEALTH</h1>
                <p className="text-lovejoy-100">Join our network of mental health professionals</p>
              </div>
            </div>
            <p className="text-lovejoy-100">
              Connect with patients, manage your practice, and make a meaningful impact in mental healthcare.
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {renderStepIndicator()}
            
            <form onSubmit={handleNextStep}>
              <div className="min-h-[500px]">
                {signUpStep === 1 && renderStep1()}
                {signUpStep === 2 && renderStep2()}
                {signUpStep === 3 && renderStep3()}
                {signUpStep === 4 && renderStep4()}
              </div>
              
              <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={signUpStep === 1 ? () => setIsSignUp(false) : handlePrevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {signUpStep === 1 ? 'Back to Sign In' : 'Previous'}
                </button>
                
                <button
                  type="submit"
                  disabled={signUpStep === 2 && !signUpData.specialty}
                  className="px-6 py-3 bg-lovejoy-600 text-white rounded-lg hover:bg-lovejoy-700 transition-all duration-300 font-semibold flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {signUpStep === 4 ? 'Submit Application' : 'Continue'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </form>
            
            {signUpStep === 1 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                >
                  Already have an account? Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center animated-bg p-4">
      <div className="w-full max-w-6xl flex glass-card rounded-3xl shadow-2xl overflow-hidden">
        {/* Left side - Branding */}
        <div className="flex-1 glass p-12 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 mr-4 bg-gold-500 rounded-lg flex items-center justify-center glow">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 text-shadow">LOVEJOY</h1>
                <h2 className="text-3xl font-light text-gray-700 text-shadow">HEALTH</h2>
              </div>
            </div>
            <div className="space-y-4 text-lg">
              <p className="text-body text-gray-700 text-shadow">Provider Portal</p>
              <p className="text-body text-gray-600 text-shadow">
                Manage your practice, connect with patients, and provide 
                exceptional mental health care through our platform.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mb-32 float"></div>
          <div className="absolute top-16 right-16 w-32 h-32 bg-white/5 rounded-full float"></div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex-1 p-12 flex flex-col justify-center glass">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <UserCheck className="w-8 h-8 text-lovejoy-600 mr-2" />
                <h3 className="text-3xl text-display text-gray-800 text-shadow">Provider Sign In</h3>
              </div>
              <p className="text-body text-gray-600 text-shadow">Access your provider dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-caption text-gray-700 mb-2 text-shadow">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-input w-full pl-11 pr-4 py-4 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-caption text-gray-700 mb-2 text-shadow">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass-input w-full pl-11 pr-4 py-4 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="primary-button w-full py-4 px-6 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing In...' : 'Sign In to Portal'}
              </button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <a href="#" className="block text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 text-shadow">
                Forgot your password?
              </a>
              <button
                onClick={() => setIsSignUp(true)}
                className="text-sm text-lovejoy-600 hover:text-lovejoy-800 font-medium transition-colors duration-200 text-shadow"
              >
                New provider? Apply to join our network
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;