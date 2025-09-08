# LoveJoy Health Provider Portal - Setup Instructions

## Converting from Demo to Production

This guide will help you set up the provider portal for real use with your Laravel backend.

## Prerequisites

1. **Laravel Backend**: Ensure your Laravel API is running at `https://portal.lovejoy.health/api`
2. **Database**: MySQL database with proper tables (see API endpoints)
3. **Authentication**: Laravel Sanctum configured for API authentication

## Required Laravel API Endpoints

Your Laravel backend must implement these endpoints:

### Authentication
- `POST /doctorLogin` - Doctor login with email/password
- `POST /logOutDoctor` - Doctor logout
- `POST /refreshAuth` - Refresh authentication token

### Doctor Management
- `POST /doctorRegistration` - Register new doctor
- `POST /updateDoctorDetails` - Update doctor profile
- `POST /fetchMyDoctorProfile` - Get current doctor profile
- `POST /updateDoctorStates` - Update online/availability status

### Appointments
- `POST /fetchAppointmentRequests` - Get appointment requests
- `POST /acceptAppointment` - Accept appointment
- `POST /declineAppointment` - Decline appointment
- `POST /completeAppointment` - Complete appointment
- `POST /addAppointmentSlots` - Add availability slots

### Financial
- `POST /fetchDoctorWalletStatement` - Get wallet transactions
- `POST /fetchDoctorEarningHistory` - Get earning history
- `POST /submitDoctorWithdrawRequest` - Request payout
- `POST /fetchDoctorPayoutHistory` - Get payout history

## Environment Setup

1. **Create `.env.local` file**:
```env
VITE_API_URL=https://portal.lovejoy.health/api
VITE_CUSTOM_HEADER=lovejoy-health-portal

# Optional: Firebase for additional features
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start development server**:
```bash
npm run dev
```

## Laravel Backend Configuration

### CORS Setup
Ensure your Laravel backend allows requests from your frontend domain:

```php
// config/cors.php
'paths' => ['api/*'],
'allowed_origins' => ['https://providers.lovejoy.health', 'http://localhost:5173'],
'allowed_headers' => ['*'],
'allowed_methods' => ['*'],
```

### Custom Header Middleware
The frontend sends a custom header `X-Custom-Header: lovejoy-health-portal`. Ensure your Laravel app accepts this:

```php
// In your middleware or controller
$customHeader = $request->header('X-Custom-Header');
if ($customHeader !== 'lovejoy-health-portal') {
    return response()->json(['error' => 'Unauthorized'], 401);
}
```

### Authentication Response Format
Your login endpoint should return:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "sanctum-token-here",
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "doctor@example.com",
    "mobile": "+1234567890",
    "category_id": 1,
    "category_name": "Psychiatrist",
    "experience_years": 10,
    "consultation_fee": 150,
    "rating": 4.8,
    "total_reviews": 45,
    "bio": "Experienced psychiatrist...",
    "education": "MD from Harvard",
    "languages": ["English", "Spanish"],
    "specializations": ["Depression", "Anxiety"],
    "is_online": true,
    "is_verified": true,
    "wallet_balance": 1250.50,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-12-20T00:00:00Z"
  }
}
```

## Database Schema

Ensure your Laravel database has these tables:
- `doctors` - Doctor profiles
- `appointments` - Appointment records
- `patients` - Patient information
- `wallet_transactions` - Financial transactions
- `withdraw_requests` - Payout requests
- `doctor_categories` - Specialization categories

## Testing the Integration

1. **Start your Laravel backend**
2. **Start the React frontend**: `npm run dev`
3. **Test login** with a real doctor account from your database
4. **Verify API calls** in browser developer tools

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
The project includes GitHub Actions for automatic deployment. Just push to the `main` branch.

### Custom Domain Setup
1. Configure DNS to point `providers.lovejoy.health` to your deployment
2. Update GitHub Pages settings to use the custom domain

## Troubleshooting

### Common Issues:
1. **CORS errors**: Check Laravel CORS configuration
2. **Authentication failures**: Verify API endpoint responses match expected format
3. **API not found**: Ensure Laravel routes are properly defined
4. **Token issues**: Check Laravel Sanctum configuration

### Debug Mode:
Add this to your `.env.local` for debugging:
```env
VITE_DEBUG=true
```

This will enable console logging of API requests and responses.

## Support

For technical issues:
1. Check browser developer console for errors
2. Verify Laravel logs for API errors
3. Test API endpoints directly with Postman/curl
4. Ensure all required environment variables are set