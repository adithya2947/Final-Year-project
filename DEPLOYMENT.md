# Deployment Guide

## Vercel Deployment Instructions

### Prerequisites
- Git repository: https://github.com/adithya2947/Final-Year-project.git
- Vercel account
- Node.js 18+ installed locally

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI
1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from project root:
```bash
vercel
```

4. Follow the prompts to connect your Git repository

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository: `https://github.com/adithya2947/Final-Year-project.git`
4. Vercel will automatically detect Next.js
5. Click "Deploy"

### Step 3: Environment Variables (Optional)
If you need environment variables, add them in Vercel Dashboard:
- Go to Project Settings → Environment Variables
- Add any required variables (e.g., DATABASE_URL, API keys)

### Step 4: Automatic Deployments
Once set up, Vercel will automatically:
- Deploy on every push to main branch
- Provide preview URLs for pull requests
- Handle SSL certificates automatically

## API Endpoints

Your application will have these API endpoints available:

### Health Check
- `GET /api/health` - Health status

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

### Analytics
- `GET /api/analytics` - Get analytics data
- `POST /api/analytics` - Add analytics data

### Dashboard
- `GET /api/dashboard/stats` - Dashboard statistics

### Recommendations
- `GET /api/recommendations` - Get recommendations

## Project Structure
```
├── app/
│   ├── api/          # Next.js API routes
│   ├── dashboard/    # Dashboard page
│   ├── analytics/    # Analytics page
│   └── monitoring/   # Monitoring page
├── components/       # React components
├── lib/              # Utilities
└── public/           # Static assets
```

## Notes
- The Flask backend has been converted to Next.js API routes for optimal Vercel performance
- All API routes are serverless functions
- Database connections should be configured using environment variables
- Static assets are automatically optimized

## Troubleshooting
- If build fails, check the Vercel deployment logs
- Ensure all dependencies are in package.json
- Verify API routes follow Next.js App Router structure
- Check environment variables are properly configured
