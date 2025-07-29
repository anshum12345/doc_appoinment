import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'appointment' },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  paymentMethod: { type: String, enum: ['razorpay', 'stripe', 'coins', 'wallet'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  transactionId: { type: String, unique: true },
  paymentGatewayResponse: { type: Object },
  description: { type: String },
  coinsUsed: { type: Number, default: 0 },
  coinsEarned: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const paymentModel = mongoose.models.payment || mongoose.model('payment', paymentSchema)

export default paymentModel