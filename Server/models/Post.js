const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  postId: {
    // Using a custom ID if needed, otherwise Mongoose generates _id
    type: String,
    required: true,
    unique: true,
  },
  type: String,
  title: String,
  date: String,
  timeToRead: String,
  summary: String,
  content: String,
  externalUrl: String,
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [
    // Store user IDs who liked the post to prevent multiple likes
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  shares: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      user: {
        // Reference to the User model
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: String, // Store name directly for display
      email: String, // Store email directly for display
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Post", PostSchema);
