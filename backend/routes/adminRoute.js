import express from 'express';
import { 
  addDoctor, 
  loginAdmin, 
  allDoctors, 
  appointmentsAdmin, 
  appointmentCancel, 
  adminDashboard,
  // createDonation // Import the createDonation function
} from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/doctorController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';

const adminRouter = express.Router();

// Admin routes
adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailablity);
adminRouter.get('/appointments', authAdmin, appointmentsAdmin);
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel);
adminRouter.get('/dashboard', authAdmin, adminDashboard);

// // Donation route
// adminRouter.post('/donation', authAdmin, createDonation); // Add the donation route

export default adminRouter;