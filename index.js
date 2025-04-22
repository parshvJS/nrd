import mongoose from 'mongoose';
import Chance from 'chance';
import User from './models/User.js';
import Post from './models/Post.js';
import Comment from './models/Comment.js';
import Message from './models/Message.js';
import Notification from './models/Notification.js';
import Media from './models/Media.js';

const chance = new Chance();
const MONGO_URI = 'mongodb+srv://jsparshv:ParshvJS@symplife.hm1gt.mongodb.net/?retryWrites=true&w=majority&appName=sympLife';

async function seedDatabase() {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Message.deleteMany({});
    await Notification.deleteMany({});
    await Media.deleteMany({});

    // Create Users
    const users = [];
    for (let i = 0; i < 50; i++) {
        const user = await User.create({
            username: chance.twitter(),
            email: chance.email(),
            passwordHash: chance.string({ length: 10 }),
            bio: chance.sentence(),
            profilePicture: chance.avatar({ protocol: 'https' }),
        });
        users.push(user);
    }
    console.log('✅ Created 50 Users');

    // Create Media
    const mediaItems = [];
    for (let i = 0; i < 50; i++) {
        const media = await Media.create({
            url: chance.url(),
            type: chance.pickone(['image', 'video']),
            uploadedBy: chance.pickone(users)._id,
        });
        mediaItems.push(media);
    }
    console.log('✅ Created 50 Media items');

    // Create Posts
    const posts = [];
    for (let i = 0; i < 50; i++) {
        const post = await Post.create({
            author: chance.pickone(users)._id,
            content: chance.paragraph(),
            media: chance.pickset(mediaItems, chance.integer({ min: 1, max: 3 })).map(m => m._id),
            likes: chance.pickset(users, chance.integer({ min: 0, max: 10 })).map(u => u._id),
        });
        posts.push(post);
    }
    console.log('✅ Created 50 Posts');

    // Create Comments
    const comments = [];
    for (let i = 0; i < 50; i++) {
        const comment = await Comment.create({
            post: chance.pickone(posts)._id,
            author: chance.pickone(users)._id,
            content: chance.sentence(),
            likes: chance.pickset(users, chance.integer({ min: 0, max: 5 })).map(u => u._id),
        });
        comments.push(comment);
    }
    console.log('✅ Created 50 Comments');

    // Create Messages
    for (let i = 0; i < 50; i++) {
        await Message.create({
            sender: chance.pickone(users)._id,
            receiver: chance.pickone(users)._id,
            content: chance.sentence(),
            read: chance.bool(),
        });
    }
    console.log('✅ Created 50 Messages');

    // Create Notifications
    for (let i = 0; i < 50; i++) {
        await Notification.create({
            user: chance.pickone(users)._id,
            type: chance.pickone(['like', 'comment', 'follow', 'message']),
            message: chance.sentence(),
            relatedUser: chance.pickone(users)._id,
            post: chance.pickone(posts)._id,
            read: chance.bool(),
        });
    }
    console.log('✅ Created 50 Notifications');

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
}

seedDatabase().catch(err => console.error(err));