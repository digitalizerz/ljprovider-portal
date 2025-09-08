# LoveJoy Health - Provider Portal

A comprehensive healthcare provider portal built with React, TypeScript, and Tailwind CSS, integrated with a Laravel backend.

## 🌐 Live Application

- **Production**: [https://providers.lovejoy.health](https://providers.lovejoy.health)
- **API Backend**: [https://portal.lovejoy.health/api](https://portal.lovejoy.health/api)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/lovejoyhealth/provider-portal.git
cd provider-portal
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Copy `.env.example` to `.env.local` and configure:
```bash
cp .env.example .env.local
```

4. **Start development server**
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## 📦 Deployment

### Automatic Deployment
- **Push to `main` branch** triggers automatic deployment to production
- **GitHub Actions** handles build and deployment process
- **Custom domain** `providers.lovejoy.health` is automatically configured

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🏥 Features

### 👨‍⚕️ Provider Management
- **Multi-step Registration** - Comprehensive onboarding for healthcare providers
- **Profile Management** - Complete provider profiles with specializations
- **Document Management** - Upload and manage professional documents
- **Verification System** - License and credential verification

### 📅 Appointment System
- **Appointment Requests** - View and manage incoming appointment requests
- **Schedule Management** - Create and manage availability slots
- **Video Consultations** - Integrated video calling system
- **Appointment History** - Complete appointment tracking

### 💰 Financial Management
- **Wallet System** - Track earnings and balance
- **Payout Requests** - Request withdrawals to bank accounts
- **Transaction History** - Detailed financial reporting
- **Earnings Analytics** - Visual earnings tracking

### 👥 Patient Management
- **Patient Profiles** - Comprehensive patient information
- **Medical Records** - Patient history and prescriptions
- **Communication** - Secure messaging with patients
- **Session Notes** - Clinical documentation

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for development and building

### Backend Integration
- **Laravel API** integration
- **Laravel Sanctum** authentication
- **MySQL** database
- **RESTful API** architecture

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── common/          # Reusable components
│   ├── views/           # Page components
│   └── profiles/        # Profile components
├── services/            # API service layers
│   ├── api.ts          # Base API configuration
│   ├── doctorAPI.ts    # Doctor-related endpoints
│   ├── appointmentAPI.ts # Appointment endpoints
│   ├── userAPI.ts      # User endpoints
│   └── settingsAPI.ts  # Settings endpoints
├── hooks/               # Custom React hooks
│   ├── useAuth.ts      # Authentication hook
│   ├── useAppointments.ts # Appointments hook
│   └── useWallet.ts    # Wallet management hook
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── styles/              # CSS and styling
```

## 🔧 API Integration

### Laravel Backend Endpoints

The application integrates with the following Laravel API endpoints:

#### Doctor Management
- `POST /doctorRegistration` - Register new provider
- `POST /updateDoctorDetails` - Update provider profile
- `POST /fetchMyDoctorProfile` - Get provider profile
- `POST /updateDoctorStates` - Update online/availability status

#### Appointments
- `POST /fetchAppointmentRequests` - Get appointment requests
- `POST /acceptAppointment` - Accept appointment
- `POST /declineAppointment` - Decline appointment
- `POST /completeAppointment` - Mark appointment as completed
- `POST /addAppointmentSlots` - Create availability slots

#### Financial
- `POST /fetchDoctorWalletStatement` - Get wallet transactions
- `POST /fetchDoctorEarningHistory` - Get earning history
- `POST /submitDoctorWithdrawRequest` - Request payout
- `POST /fetchDoctorPayoutHistory` - Get payout history

#### Prescriptions
- `POST /addPrescription` - Create prescription
- `POST /editPrescription` - Update prescription

### Authentication
Uses Laravel Sanctum with custom header middleware:
```typescript
headers: {
  'Authorization': `Bearer ${token}`,
  'X-Custom-Header': 'your-custom-header-value',
  'Content-Type': 'application/json'
}
```

## 🎨 Design System

### Glassmorphism UI
- **Glass effects** with backdrop blur
- **Subtle animations** and micro-interactions
- **Apple-inspired** design aesthetics
- **Responsive design** for all devices

### Color Palette
- **Primary**: LoveJoy Blue (#1e3a8a)
- **Secondary**: Gold (#f59e0b)
- **Success**: Emerald
- **Warning**: Amber
- **Error**: Red

## 🔐 Security Features

- **Token-based authentication**
- **Protected routes**
- **Input validation**
- **File upload security**
- **HIPAA-compliant** messaging

## 📱 Responsive Design

- **Mobile-first** approach
- **Tablet optimization**
- **Desktop experience**
- **Touch-friendly** interfaces

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Laravel backend running

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd lovejoy-provider-portal
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create `.env.local`:
```env
VITE_API_URL=https://portal.lovejoy.health/api
VITE_CUSTOM_HEADER=lovejoy-health-portal
```

4. **Start development server**
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## 🔧 Configuration

### API Configuration
The application is configured to connect to:
- **Production API**: `https://portal.lovejoy.health/api`
- **Development API**: Can be overridden in `.env.local`

### Environment Variables
```env
VITE_API_URL=https://portal.lovejoy.health/api
VITE_CUSTOM_HEADER=lovejoy-health-portal
```

## 📊 Features Overview

### Dashboard
- **Today's appointments**
- **Recent messages**
- **Earnings overview**
- **Patient statistics**

### Appointments
- **Request management**
- **Calendar view**
- **Video consultations**
- **Prescription management**

### Patients
- **Patient profiles**
- **Medical history**
- **Communication logs**
- **Treatment plans**

### Wallet
- **Balance tracking**
- **Transaction history**
- **Payout management**
- **Earnings analytics**

### Profile
- **Professional information**
- **Specializations**
- **Availability settings**
- **Document uploads**

## 🤝 Contributing

### Development Workflow
1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a feature branch**: `git checkout -b feature/your-feature-name`
4. **Make your changes** and test thoroughly
5. **Commit your changes**: `git commit -m "Add your feature"`
6. **Push to your fork**: `git push origin feature/your-feature-name`
7. **Create a Pull Request** on GitHub

### Code Standards
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for code formatting
- **Conventional Commits** for commit messages

### Testing
```bash
npm run lint        # Run linter
npm run build       # Test build process
```

## 📄 License

This project is proprietary software for LoveJoy Health.

## 🆘 Support

For technical support or questions:
- **Email**: support@lovejoyhealth.com
- **GitHub Issues**: [Create an issue](https://github.com/lovejoyhealth/provider-portal/issues)
- **Documentation**: See README and code comments

## 📋 Project Status

- ✅ **Core Features**: Complete
- ✅ **API Integration**: Ready for Laravel backend
- ✅ **Authentication**: Implemented with Laravel Sanctum support
- ✅ **Deployment**: Automated via GitHub Actions
- 🔄 **Testing**: In development
- 🔄 **Documentation**: Ongoing
---

Built with ❤️ for healthcare providers by the LoveJoy Health team.