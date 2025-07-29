import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import userModel from '../models/userModel.js'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import bloodDonationModel from '../models/bloodDonationModel.js'
import paymentModel from '../models/paymentModel.js'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !password || !email) {
      return res.json({ success: false, message: 'Missing Details' })
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Enter a valid email' })
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: 'Enter a strong password (minimum 8 characters)' })
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.json({ success: false, message: 'User already exists with this email' })
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')

    const userData = {
      name, 
      email, 
      password: hashedPassword,
      verificationToken,
      coins: 100 // Give 100 coins as welcome bonus
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email address',
      html: `
        <h2>Welcome to DocAppointment!</h2>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>You've received 100 coins as a welcome bonus!</p>
      `
    }

    try {
      await transporter.sendMail(mailOptions)
    } catch (emailError) {
      console.log('Email sending failed:', emailError)
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ success: true, token, message: 'Registration successful! Please check your email to verify your account.' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: 'User does not exist' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      // Update last login
      await userModel.findByIdAndUpdate(user._id, { lastLogin: Date.now() })
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, token, user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        coins: user.coins,
        isVerified: user.isVerified 
      }})
    } else {
      res.json({ success: false, message: 'Invalid Credentials' })
    }

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to verify email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params
    const user = await userModel.findOne({ verificationToken: token })

    if (!user) {
      return res.json({ success: false, message: 'Invalid verification token' })
    }

    await userModel.findByIdAndUpdate(user._id, { 
      isVerified: true, 
      verificationToken: null 
    })

    res.json({ success: true, message: 'Email verified successfully!' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to request password reset
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = Date.now() + 3600000 // 1 hour

    await userModel.findByIdAndUpdate(user._id, {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetTokenExpiry
    })

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
      `
    }

    await transporter.sendMail(mailOptions)
    res.json({ success: true, message: 'Password reset email sent' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to reset password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body
    const user = await userModel.findOne({ 
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
      return res.json({ success: false, message: 'Invalid or expired reset token' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    await userModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    })

    res.json({ success: true, message: 'Password reset successfully' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body
    const userData = await userModel.findById(userId).select('-password')

    res.json({ success: true, userData })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
} 

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender, bloodGroup, isBloodDonor } = req.body
    const imageFile = req.file

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: 'Data Missing' })
    }

    const updateData = { name, phone, address: JSON.parse(address), dob, gender, bloodGroup, isBloodDonor }

    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
      updateData.image = imageUpload.secure_url
    }

    await userModel.findByIdAndUpdate(userId, updateData)

    res.json({ success: true, message: 'Profile Updated' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to add emergency contact
const addEmergencyContact = async (req, res) => {
  try {
    const { userId, name, phone, relationship } = req.body

    if (!name || !phone || !relationship) {
      return res.json({ success: false, message: 'Missing contact details' })
    }

    await userModel.findByIdAndUpdate(userId, {
      $push: { emergencyContacts: { name, phone, relationship } }
    })

    res.json({ success: true, message: 'Emergency contact added' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to add medical history
const addMedicalHistory = async (req, res) => {
  try {
    const { userId, condition, diagnosedDate } = req.body

    if (!condition || !diagnosedDate) {
      return res.json({ success: false, message: 'Missing medical details' })
    }

    await userModel.findByIdAndUpdate(userId, {
      $push: { medicalHistory: { condition, diagnosedDate } }
    })

    res.json({ success: true, message: 'Medical history added' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to book appointment with coins system
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime, paymentMethod, useCoins } = req.body

    const docData = await doctorModel.findById(docId).select('-password')
    const userData = await userModel.findById(userId).select('-password')

    if (!docData.available) {
      return res.json({ success: false, message: 'Doctor not available' })
    }

    let slots_booked = docData.slots_booked

    // checking for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: 'Slot not available' })
      } else {
        slots_booked[slotDate].push(slotTime)
      }
    } else {
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }

    delete docData.slots_booked

    const appointmentData = {
      userId, docId,
      userData, docData,
      amount: docData.fees,
      slotTime, slotDate,
      date: Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData)
    const savedAppointment = await newAppointment.save()

    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    // Handle payment
    let paymentStatus = 'pending'
    let coinsUsed = 0
    let coinsEarned = 50 // Give 50 coins for booking appointment

    if (useCoins && userData.coins >= 50) {
      // Use coins for payment
      coinsUsed = 50
      paymentStatus = 'completed'
      await userModel.findByIdAndUpdate(userId, { 
        $inc: { coins: -50 + coinsEarned } // Deduct 50, add 50 earned
      })
    } else {
      // Regular payment flow
      await userModel.findByIdAndUpdate(userId, { 
        $inc: { coins: coinsEarned } // Add 50 coins earned
      })
    }

    // Create payment record
    const paymentData = {
      userId,
      appointmentId: savedAppointment._id,
      amount: docData.fees,
      paymentMethod,
      status: paymentStatus,
      transactionId: `TXN_${Date.now()}_${userId}`,
      coinsUsed,
      coinsEarned,
      description: `Appointment with Dr. ${docData.name}`
    }

    const newPayment = new paymentModel(paymentData)
    await newPayment.save()

    res.json({ 
      success: true, 
      message: 'Appointment Booked',
      coinsEarned,
      paymentStatus
    })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to get user appointments
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body
    const appointments = await appointmentModel.find({ userId }).populate('docId')

    res.json({ success: true, appointments })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    // verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: 'Unauthorized action' })
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    // releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData
    const doctorData = await doctorModel.findById(docId)
    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({ success: true, message: 'Appointment Cancelled' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to create blood donation request
const createBloodRequest = async (req, res) => {
  try {
    const { 
      userId, bloodGroup, units, urgency, hospital, city, 
      contactPerson, contactPhone, requiredDate, reason 
    } = req.body

    if (!bloodGroup || !units || !hospital || !city || !contactPerson || !contactPhone || !requiredDate || !reason) {
      return res.json({ success: false, message: 'Missing required fields' })
    }

    const bloodRequest = new bloodDonationModel({
      requesterId: userId,
      bloodGroup,
      units,
      urgency,
      hospital,
      city,
      contactPerson,
      contactPhone,
      requiredDate,
      reason
    })

    await bloodRequest.save()

    // Find potential donors
    const potentialDonors = await userModel.find({
      bloodGroup,
      isBloodDonor: true,
      'address.city': city
    }).select('name email phone')

    res.json({ 
      success: true, 
      message: 'Blood request created successfully',
      potentialDonors: potentialDonors.length
    })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to get blood donation requests
const getBloodRequests = async (req, res) => {
  try {
    const { userId, city } = req.body
    let query = { status: 'pending' }
    
    if (city) {
      query.city = city
    }

    const requests = await bloodDonationModel.find(query)
      .populate('requesterId', 'name')
      .sort({ createdAt: -1 })

    res.json({ success: true, requests })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to respond to blood donation request
const respondToBloodRequest = async (req, res) => {
  try {
    const { userId, requestId, response } = req.body // response: 'accept' or 'reject'

    const bloodRequest = await bloodDonationModel.findById(requestId)
    if (!bloodRequest) {
      return res.json({ success: false, message: 'Request not found' })
    }

    const donorIndex = bloodRequest.matchedDonors.findIndex(
      donor => donor.donorId.toString() === userId
    )

    if (donorIndex === -1) {
      // Add new donor response
      bloodRequest.matchedDonors.push({
        donorId: userId,
        status: response === 'accept' ? 'accepted' : 'rejected'
      })
    } else {
      // Update existing response
      bloodRequest.matchedDonors[donorIndex].status = response === 'accept' ? 'accepted' : 'rejected'
    }

    if (response === 'accept') {
      bloodRequest.status = 'matched'
    }

    await bloodRequest.save()

    res.json({ success: true, message: `Blood request ${response}ed successfully` })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to get user coins and transactions
const getUserCoins = async (req, res) => {
  try {
    const { userId } = req.body
    const user = await userModel.findById(userId).select('coins')
    const payments = await paymentModel.find({ userId }).sort({ createdAt: -1 }).limit(10)

    res.json({ success: true, coins: user.coins, recentTransactions: payments })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export { 
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
}