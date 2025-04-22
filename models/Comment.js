import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Comment', commentSchema);
