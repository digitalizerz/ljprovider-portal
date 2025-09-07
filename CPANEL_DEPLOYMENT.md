# cPanel Deployment Guide

## Prerequisites
- cPanel hosting account
- Domain `lovejoy.health` configured in cPanel
- Node.js installed locally for building

## Steps to Deploy

### 1. Build the Project Locally
```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This creates a `dist` folder with static files.

### 2. Upload to cPanel
1. **Access cPanel File Manager**
2. **Navigate to public_html** (or subdomain folder)
3. **Create subdirectory**: `providers` (for providers.lovejoy.health)
4. **Upload all contents** from the `dist` folder to the `providers` directory

### 3. Configure Subdomain in cPanel
1. **Go to Subdomains** in cPanel
2. **Create subdomain**: `providers`
3. **Document Root**: `/public_html/providers`

### 4. Update API Configuration
Since the backend API is at `portal.lovejoy.health/api`, make sure:
- The API server is running and accessible
- CORS is configured to allow requests from `providers.lovejoy.health`

### 5. Test the Deployment
Visit `https://providers.lovejoy.health` to test.

## Important Notes

### SPA Routing Issue
React Router won't work properly on cPanel without server configuration. You may need to:
1. **Add .htaccess file** to handle client-side routing:

```apache
RewriteEngine On
RewriteBase /

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### API Configuration
The app expects the API at `https://portal.lovejoy.health/api`. Make sure:
- This API endpoint is live and working
- CORS headers allow requests from your domain
- All API endpoints match what the frontend expects

### Environment Variables
Update the production build to use the correct API URL:
```bash
# Build with production API
VITE_API_URL=https://portal.lovejoy.health/api npm run build
```

## Alternative: Static Hosting Platforms

If cPanel causes issues, consider:
- **Netlify**: Automatic deployments from GitHub
- **Vercel**: Great for React apps
- **GitHub Pages**: Free hosting with custom domains

These platforms handle SPA routing automatically and are optimized for React applications.