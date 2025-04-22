import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  bio: { type: String },
  profilePicture: { type: String },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
