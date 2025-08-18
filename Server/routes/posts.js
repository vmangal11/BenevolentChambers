const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User"); // Assuming you have a User model
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

// @route   GET /api/posts
// @desc    Get all posts and populate user details
// @access  Public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "comments.user",
        model: "User",
        select: "name email",
      })
      .populate({
        path: "likedBy",
        model: "User",
        select: "name email",
      })
      .sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/posts/seed
// @desc    Seed initial dummy posts (run once)
// @access  Public (for initial setup, restrict later)
router.post("/seed", async (req, res) => {
  try {
    const dummyPosts = [
      {
        postId: "post1",
        type: "external",
        title: "Women Directors as Alternate Directors: Seeking Clarifications",
        date: "April 13, 2016",
        timeToRead: "8 min read",
        summary:
          "A short summary of the article about women directors and legal frameworks.",
        content: `## Full Article

In the August 2013 edition of the Harvard Business Review, an article titled “Women in the Workplace” highlighted the impact of women directors...

This article explores the implications of appointing women directors as alternate directors, the legal framework involved...

Conclusion: While companies have made strides in compliance, clarity on alternate directorships can improve transparency.`,
        externalUrl:
          "https://www.linkedin.com/pulse/women-directors-alternate-seeking-clarifications-abhilash-agrawal/",
        views: 0,
        likes: 0,
        comments: [],
        likedBy: [],
      },
      {
        postId: "post2",
        type: "external",
        title: "Women Directors as Alternate Directors",
        date: "April 1, 2016",
        timeToRead: "8 min read",
        summary: "A short summary...",
        content: `## Full Article
    
    ion: While companies have made strides in compliance, clarity on alternate directorships can improve transparency.`,
        externalUrl:
          "https://www.linkedin.com/pulse/women-directors-alternate-seeking-clarifications-abhilash-agrawal/",
        views: 0,
        likes: 0,
        comments: [],
        likedBy: [],
      },
      {
        postId: "post3",
        type: "external",
        title: "Women Directors as Alternate Directors: Seeking Clarifications",
        date: "April 2, 2016",
        timeToRead: "8 min read",
        summary: "A short summary...",
        content: `## Full Article

In the August 2013 edition of the Harvard Business Review, an article titled “Women in the Workplace” highlighted the impact of women directors...

This article explores the implications of appointing women directors as alternate directors, the legal framework involved...

Conclusion: While companies have made strides in compliance, clarity on alternate directorships can improve transparency.`,
        externalUrl:
          "https://www.linkedin.com/pulse/women-directors-alternate-seeking-clarifications-abhilash-agrawal/",
        views: 0,
        likes: 0,
        comments: [],
        likedBy: [],
      },
    ];

    const existingPost = await Post.findOne({ postId: "post1" });
    if (existingPost) {
      return res.status(200).json({ msg: "Dummy posts already seeded." });
    }

    await Post.insertMany(dummyPosts);
    res.json({ msg: "Dummy posts seeded successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT /api/posts/:id/view
// @desc    Increment post views
// @access  Public
router.put("/:id/view", async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { postId: req.params.id }, // Find by custom postId
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    // Return the updated post object, not just the views count
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT /api/posts/:id/like
// @desc    Like/Unlike a post
// @access  Private (requires authentication)
router.put("/:id/like", auth, async (req, res) => {
  try {
    const post = await Post.findOne({ postId: req.params.id });
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const isLiked = post.likedBy.some(
      (userId) => userId.toString() === req.user.id.toString()
    );

    if (isLiked) {
      post.likes = Math.max(0, post.likes - 1);
      post.likedBy = post.likedBy.filter(
        (userId) => userId.toString() !== req.user.id.toString()
      );
    } else {
      post.likes += 1;
      post.likedBy.push(req.user.id);
    }

    await post.save();

    // Re-fetch and populate the updated post before sending the response
    const populatedPost = await Post.findOne({
      postId: req.params.id,
    }).populate("likedBy", "name email");

    res.json(populatedPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT /api/posts/:id/share
// @desc    Increment post shares
// @access  Public
router.put("/:id/share", async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { postId: req.params.id },
      { $inc: { shares: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/posts/:id/comment
// @desc    Add a comment to a post
// @access  Private (requires authentication)
router.post("/:id/comment", auth, async (req, res) => {
  try {
    // Log the entire request object to see all its properties
    console.log("Full Request Object:", req);

    // Log the request body to see the data sent by the client
    console.log("Request Body:", req.body);
    console.log(req.user.name);
    // Log the user details that are added by the 'auth' middleware
    // This is the most crucial part for debugging your issue
    console.log("Authenticated User Details (req.user):", req.user);

    const post = await Post.findOne({ postId: req.params.id });

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Create the new comment object with the user's name and email embedded
    const newComment = {
      user: req.user.id, // Reference to the user ID
      name: req.user.name, // The user's name is now stored directly
      email: req.user.email, // The user's email is now stored directly
      text: req.body.text,
    };

    post.comments.unshift(newComment);
    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route   DELETE /api/posts/:post_id/comment/:comment_id
// @desc    Delete a comment
// @access  Private
router.delete("/:post_id/comment/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findOne({ postId: req.params.post_id });

    // Make sure post exists
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id.toString() === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check user (only comment owner can delete)
    // IMPORTANT: Note that `comment.user` is now the populated user ID from the initial fetch, or the ID if the document is not populated.
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.id.toString())
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    // The saved post will now have the name and email on the new comment object
    // You no longer need to populate this route, since the data is embedded
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
