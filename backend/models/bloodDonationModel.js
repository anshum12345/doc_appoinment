import mongoose from "mongoose";

const bloodDonationSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  bloodGroup: { type: String, required: true },
  units: { type: Number, required: true, min: 1 },
  urgency: { type: String, enum: ['low', 'medium', 'high', 'emergency'], default: 'medium' },
  hospital: { type: String, required: true },
  city: { type: String, required: true },
  contactPerson: { type: String, required: true },
  contactPhone: { type: String, required: true },
  requiredDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['pending', 'matched', 'completed', 'cancelled'], default: 'pending' },
  matchedDonors: [{ 
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
    matchedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const bloodDonationModel = mongoose.models.bloodDonation || mongoose.model('bloodDonation', bloodDonationSchema)

export default bloodDonationModel