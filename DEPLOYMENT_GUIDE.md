# Deployment Guide: Vercel

## Prerequisites
- Git repository created on GitHub/GitLab
- Vercel account (free tier is sufficient)
- Node.js installed locally

## Step 1: Push to Git Repository

1. Create a new repository on GitHub or GitLab
2. Copy the repository URL
3. Run these commands:

```bash
# Replace with your actual repository URL
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

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

### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Vercel will automatically detect Next.js
5. Configure environment variables if needed
6. Click "Deploy"

## Configuration Details

### Frontend (Next.js)
- Automatically detected by Vercel
- Build command: `npm run build`
- Output directory: `.next`

### Backend (API Routes)
- Created as serverless functions in `/api` directory
- Routes available at:
  - `/api/health` - Health check
  - `/api/users` - User management
  - `/api/analytics` - Analytics data
  - `/api/dashboard/stats` - Dashboard statistics
  - `/api/recommendations` - Recommendations

### Environment Variables
Add these in Vercel dashboard if needed:
```
NODE_ENV=production
PYTHON_VERSION=3.11
```

## Post-Deployment

1. **Test the application**:
   - Frontend: Your Vercel URL
   - API: `https://your-app.vercel.app/api/health`

2. **Custom Domain** (optional):
   - Go to Vercel dashboard
   - Project Settings → Domains
   - Add your custom domain

3. **Monitor Deployment**:
   - Check Vercel dashboard for build logs
   - Monitor function performance

## Troubleshooting

### Common Issues:
1. **Build fails**: Check package.json dependencies
2. **API not working**: Verify `/api` directory structure
3. **CORS errors**: API routes should handle CORS automatically
4. **Environment variables**: Ensure they're set in Vercel dashboard

### Debug Commands:
```bash
# Local testing
npm run dev
npm run build

# Vercel logs
vercel logs
```

## Next Steps

1. Set up custom domain
2. Configure analytics (Vercel Analytics)
3. Set up monitoring and alerts
4. Consider database integration (Vercel Postgres or external)
5. Set up CI/CD pipeline

## Production Considerations

- The Flask backend is converted to serverless functions
- Database persistence requires external service (Vercel Postgres, etc.)
- Environment variables should be set in Vercel dashboard
- Monitor function execution time and cold starts
