# 🚀 Deployment Guide - DocAppointment

This guide will help you deploy the enhanced DocAppointment platform to production environments.

## 📋 Prerequisites

Before deployment, ensure you have:

- **Git** installed
- **Node.js** (v16 or higher)
- **MongoDB Atlas** account
- **Cloudinary** account for image uploads
- **Email service** (Gmail or other SMTP provider)
- **Payment gateway** accounts (Razorpay/Stripe)

## 🌐 Backend Deployment

### Option 1: Railway (Recommended)

1. **Create Railway Account**
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Clone your repository
   git clone <your-repo-url>
   cd doc_appoinment/backend
   
   # Initialize git if not already done
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Connect to Railway**
   - Go to Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Set root directory to `backend`

4. **Configure Environment Variables**
   In Railway dashboard, add these variables:
   ```env
   PORT=4000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/docappointment
   JWT_SECRET=your_super_secret_jwt_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   FRONTEND_URL=https://your-frontend-domain.com
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

5. **Deploy**
   - Railway will automatically deploy when you push to GitHub
   - Get your backend URL from Railway dashboard

### Option 2: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

4. **Add MongoDB**
   ```bash
   heroku addons:create mongolab:sandbox
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   heroku config:set CLOUDINARY_API_KEY=your_cloudinary_api_key
   heroku config:set CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   heroku config:set EMAIL_USER=your_email@gmail.com
   heroku config:set EMAIL_PASS=your_email_app_password
   heroku config:set FRONTEND_URL=https://your-frontend-domain.com
   heroku config:set RAZORPAY_KEY_ID=your_razorpay_key_id
   heroku config:set RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   heroku config:set STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

6. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Create Vercel Account**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy Frontend**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

3. **Connect to Vercel**
   - Go to Vercel dashboard
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Set build command: `npm run build`
   - Set output directory: `dist`

4. **Configure Environment Variables**
   In Vercel dashboard, add:
   ```env
   VITE_BACKEND_URL=https://your-backend-url.com
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

5. **Deploy**
   - Vercel will automatically deploy
   - Get your frontend URL from Vercel dashboard

### Option 2: Netlify

1. **Create Netlify Account**
   - Visit [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Deploy**
   ```bash
   cd frontend
   npm run build
   ```

3. **Connect to Netlify**
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Choose your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

4. **Set Environment Variables**
   In Netlify dashboard, go to Site settings > Environment variables:
   ```env
   VITE_BACKEND_URL=https://your-backend-url.com
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

## 🔧 Database Setup

### MongoDB Atlas

1. **Create Cluster**
   - Go to [mongodb.com](https://mongodb.com)
   - Create free account
   - Create new cluster

2. **Configure Network Access**
   - Go to Network Access
   - Add IP address: `0.0.0.0/0` (allow all)

3. **Create Database User**
   - Go to Database Access
   - Create new user with read/write permissions

4. **Get Connection String**
   - Go to Clusters
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string

## 📧 Email Configuration

### Gmail Setup

1. **Enable 2-Factor Authentication**
   - Go to Google Account settings
   - Enable 2FA

2. **Generate App Password**
   - Go to Security settings
   - Generate app password for "Mail"
   - Use this password in EMAIL_PASS

3. **Update Environment Variables**
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

## 💳 Payment Gateway Setup

### Razorpay

1. **Create Account**
   - Visit [razorpay.com](https://razorpay.com)
   - Sign up for business account

2. **Get API Keys**
   - Go to Settings > API Keys
   - Generate new key pair
   - Use in environment variables

### Stripe

1. **Create Account**
   - Visit [stripe.com](https://stripe.com)
   - Sign up for account

2. **Get API Keys**
   - Go to Developers > API Keys
   - Copy publishable and secret keys
   - Use in environment variables

## 🖼️ Cloudinary Setup

1. **Create Account**
   - Visit [cloudinary.com](https://cloudinary.com)
   - Sign up for free account

2. **Get Credentials**
   - Go to Dashboard
   - Copy Cloud Name, API Key, and API Secret
   - Use in environment variables

## 🔒 Security Checklist

Before going live, ensure:

- [ ] **JWT Secret** is strong and unique
- [ ] **MongoDB** has proper authentication
- [ ] **CORS** is configured for your domains
- [ ] **Environment variables** are set correctly
- [ ] **HTTPS** is enabled on all domains
- [ ] **Rate limiting** is implemented
- [ ] **Input validation** is working
- [ ] **Error handling** is comprehensive

## 🧪 Testing Deployment

1. **Test Backend**
   ```bash
   curl https://your-backend-url.com/api/health
   ```

2. **Test Frontend**
   - Visit your frontend URL
   - Test registration/login
   - Test appointment booking
   - Test blood donation features

3. **Test Payment**
   - Use test cards for payment testing
   - Verify webhook endpoints

## 📊 Monitoring

### Backend Monitoring

1. **Railway/Heroku Logs**
   ```bash
   # Railway
   railway logs
   
   # Heroku
   heroku logs --tail
   ```

2. **Error Tracking**
   - Consider adding Sentry for error tracking
   - Monitor API response times

### Frontend Monitoring

1. **Vercel Analytics**
   - Enable Vercel Analytics
   - Monitor page performance

2. **User Analytics**
   - Add Google Analytics
   - Track user behavior

## 🔄 CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        uses: railway/deploy@v1
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS configuration in backend
   - Ensure frontend URL is in allowed origins

2. **Database Connection**
   - Verify MongoDB connection string
   - Check network access settings

3. **Email Not Sending**
   - Verify email credentials
   - Check app password setup

4. **Payment Issues**
   - Verify payment gateway keys
   - Check webhook endpoints

### Support

- Check deployment platform documentation
- Review error logs
- Test locally first
- Use staging environment for testing

## 📈 Performance Optimization

1. **Backend**
   - Enable compression
   - Implement caching
   - Optimize database queries

2. **Frontend**
   - Enable code splitting
   - Optimize images
   - Use CDN for assets

3. **Database**
   - Create proper indexes
   - Monitor query performance
   - Regular backups

---

**Happy Deploying! 🚀**