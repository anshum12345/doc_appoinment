import express from 'express';
import { 
  registerUser, 
  loginUser, 
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  getProfile,
  updateProfile, 
  addEmergencyContact,
  addMedicalHistory,
  bookAppointment, 
  listAppointment, 
  cancelAppointment,
  createBloodRequest,
  getBloodRequests,
  respondToBloodRequest,
  getUserCoins
} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

// Authentication routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/verify-email/:token', verifyEmail);
userRouter.post('/request-password-reset', requestPasswordReset);
userRouter.post('/reset-password', resetPassword);

// Profile routes
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.post('/add-emergency-contact', authUser, addEmergencyContact);
userRouter.post('/add-medical-history', authUser, addMedicalHistory);

// Appointment routes
userRouter.post('/book-appointment', authUser, bookAppointment);
userRouter.get('/appointments', authUser, listAppointment);
userRouter.post('/cancel-appointment', authUser, cancelAppointment);

// Blood donation routes
userRouter.post('/create-blood-request', authUser, createBloodRequest);
userRouter.get('/blood-requests', authUser, getBloodRequests);
userRouter.post('/respond-blood-request', authUser, respondToBloodRequest);

// Coins and payment routes
userRouter.get('/coins', authUser, getUserCoins);

export default userRouter