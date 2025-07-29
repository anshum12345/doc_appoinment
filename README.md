# 🏥 DocAppointment - Advanced Healthcare Platform

A comprehensive, modern healthcare platform that connects patients with doctors, featuring advanced functionalities like blood donation networks, coin-based rewards, and professional medical services.

## ✨ Features

### 🔐 Enhanced Authentication & Security
- **Secure Registration/Login** with bcrypt.js password hashing
- **Email Verification** system for new accounts
- **Password Reset** functionality via email
- **JWT Token** based authentication
- **Form Validation** with real-time error handling

### 💰 Coins & Rewards System
- **Welcome Bonus**: 100 coins for new users
- **Appointment Rewards**: 50 coins for each appointment booking
- **Blood Donation Rewards**: 100 coins for successful donations
- **Referral System**: 25 coins for each friend who joins
- **Wallet Management**: Track coins and transaction history
- **Payment Integration**: Support for Razorpay and Stripe

### 🩸 Blood Donation Network
- **Blood Request Creation**: Create urgent blood donation requests
- **Donor Matching**: Automatic matching based on blood group and location
- **Urgency Levels**: Emergency, High, Medium, Low priority system
- **Hospital Integration**: Direct hospital contact information
- **Donor Response System**: Accept/Decline donation requests
- **Geographic Matching**: Find donors in your city

### 👤 Enhanced User Profiles
- **Medical History**: Track conditions and medications
- **Emergency Contacts**: Store important contact information
- **Blood Group**: Register as blood donor
- **Insurance Details**: Store insurance information
- **Allergies & Medications**: Comprehensive health records
- **Profile Customization**: Upload profile pictures

### 🏥 Professional Medical Services
- **Specialty-based Doctor Search**: Find doctors by specialization
- **Appointment Booking**: Easy slot booking system
- **Payment Processing**: Multiple payment options
- **Appointment Management**: View, cancel, and reschedule
- **Doctor Reviews**: Rate and review doctors
- **Medical Records**: Secure health information storage

### 🎨 Modern UI/UX Design
- **Responsive Design**: Works on all devices
- **Professional Styling**: Modern gradients and animations
- **Glass Morphism**: Beautiful visual effects
- **Dark Mode Support**: Automatic theme detection
- **Loading States**: Smooth user experience
- **Toast Notifications**: Real-time feedback

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd doc_appoinment
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

4. **Environment Variables**

Create `.env` files in both backend and frontend directories:

**Backend (.env)**
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
FRONTEND_URL=http://localhost:5173
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

**Frontend (.env)**
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

5. **Start the Application**

**Backend**
```bash
cd backend
npm run server
```

**Frontend**
```bash
cd frontend
npm run dev
```

## 📁 Project Structure

```
doc_appoinment/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── mongodb.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── doctorController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   ├── authAdmin.js
│   │   ├── authDoctor.js
│   │   ├── authUser.js
│   │   └── multer.js
│   ├── models/
│   │   ├── appointmentModel.js
│   │   ├── bloodDonationModel.js
│   │   ├── doctorModel.js
│   │   ├── paymentModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── adminRoute.js
│   │   ├── doctorRoute.js
│   │   └── userRoute.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── BloodDonation.jsx
│   │   │   ├── Wallet.jsx
│   │   │   └── ...
│   │   └── ...
│   └── ...
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/verify-email/:token` - Email verification
- `POST /api/user/request-password-reset` - Password reset request
- `POST /api/user/reset-password` - Password reset

### User Profile
- `GET /api/user/get-profile` - Get user profile
- `POST /api/user/update-profile` - Update user profile
- `POST /api/user/add-emergency-contact` - Add emergency contact
- `POST /api/user/add-medical-history` - Add medical history

### Appointments
- `POST /api/user/book-appointment` - Book appointment
- `GET /api/user/appointments` - Get user appointments
- `POST /api/user/cancel-appointment` - Cancel appointment

### Blood Donation
- `POST /api/user/create-blood-request` - Create blood request
- `GET /api/user/blood-requests` - Get blood requests
- `POST /api/user/respond-blood-request` - Respond to blood request

### Wallet & Coins
- `GET /api/user/coins` - Get user coins and transactions

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **bcryptjs** - Password hashing
- **JWT** - Authentication
- **Nodemailer** - Email services
- **Cloudinary** - Image upload
- **Multer** - File handling
- **Razorpay/Stripe** - Payment processing

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Notifications
- **Framer Motion** - Animations

## 🎯 Key Features Implementation

### Coins System
- Users earn coins for various activities
- Coins can be used for appointment bookings
- Transaction history tracking
- Payment gateway integration

### Blood Donation Network
- Real-time blood request matching
- Geographic-based donor search
- Urgency level classification
- Hospital integration

### Enhanced Security
- bcrypt.js for password hashing
- JWT token authentication
- Email verification system
- Secure password reset

### Professional UI
- Modern gradient designs
- Responsive layout
- Smooth animations
- Professional color scheme

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables
2. Configure MongoDB Atlas
3. Deploy using Git integration

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy using Git integration
3. Set environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **Video Consultations**: Real-time doctor-patient video calls
- **AI Symptom Checker**: AI-powered preliminary diagnosis
- **Medicine Delivery**: Integration with pharmacies
- **Health Insurance**: Direct insurance claim processing
- **Multi-language Support**: Internationalization
- **Mobile App**: React Native mobile application
- **Analytics Dashboard**: Health insights and analytics
- **Telemedicine**: Remote healthcare services

---

**Built with ❤️ for better healthcare accessibility**

