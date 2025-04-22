import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  url: String,
  type: { type: String, enum: ['image', 'video'] },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Media', mediaSchema);
