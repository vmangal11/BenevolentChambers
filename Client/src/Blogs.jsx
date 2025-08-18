// Blogs.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import LoginModal from "./Login.jsx";
import { Trash2 } from "lucide-react";
import axios from "axios";

import {
  HandThumbUpIcon as LikeIconOutline,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { HandThumbUpIcon as LikeIconSolid } from "@heroicons/react/24/solid";

const API_URL = "https://benevolentchambers.onrender.com";

const dummyPosts = [
  {
    postId: "post1",
    type: "external",
    title: "Women Directors as Alternate Directors: Seeking Clarifications",
    date: "April 13, 2016",
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

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [likedPostsState, setLikedPostsState] = useState({});
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("blog_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem("blog_token") || null;
  });

  const [comment, setComment] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const getAuthHeaders = () => ({
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": authToken,
    },
  });

  const showTemporaryToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}/posts`);
        if (res.data.length === 0) {
          setPosts(dummyPosts);
        } else {
          setPosts(res.data);
        }

        if (currentUser) {
          const initialLikedState = {};
          res.data.forEach((post) => {
            initialLikedState[post.postId] = post.likedBy.some(
              (likedByUser) => likedByUser._id === currentUser.id
            );
          });
          setLikedPostsState(initialLikedState);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts(dummyPosts);
        showTemporaryToast("Backend not connected. Using dummy data.");
      }
    };
    fetchPosts();
  }, [currentUser, authToken]);

  useEffect(() => {
    if (selectedPost) {
      const updatedPost = posts.find((p) => p.postId === selectedPost.postId);
      if (updatedPost) {
        setSelectedPost(updatedPost);
      } else {
        setSelectedPost(null);
      }
    }
  }, [posts, selectedPost]);

  const handleCardClick = async (post) => {
    if (!post._id) {
      console.log("This is a dummy post, skipping view update API call.");
      setSelectedPost(post);
      return;
    }

    try {
      const res = await axios.put(`${API_URL}/posts/${post.postId}/view`);
      const updatedPost = res.data;
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.postId === updatedPost.postId ? updatedPost : p
        )
      );
      setSelectedPost(updatedPost);
    } catch (err) {
      console.error(`Error updating view for post ${post.postId}:`, err);
      const updatedPost = { ...post, views: (post.views || 0) + 1 };
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.postId === updatedPost.postId ? updatedPost : p
        )
      );
      setSelectedPost(updatedPost);
    }
  };

  const handleLike = async (postId) => {
    if (!currentUser) {
      setIsLoginOpen(true);
      return;
    }
    try {
      const res = await axios.put(
        `${API_URL}/posts/${postId}/like`,
        {},
        getAuthHeaders()
      );
      const updatedPost = res.data;
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.postId === updatedPost.postId ? updatedPost : p
        )
      );
      setLikedPostsState((prev) => ({
        ...prev,
        [postId]: updatedPost.likedBy.some(
          (likedByUser) => likedByUser._id === currentUser.id
        ),
      }));
    } catch (err) {
      console.error(`Error liking post ${postId}:`, err);
      showTemporaryToast("Please log in to like a post.");
    }
  };

  const handleShare = (post) => {
    if (post && post.externalUrl) {
      navigator.clipboard.writeText(post.externalUrl);
      showTemporaryToast("🔗 Link copied to clipboard!");
    } else {
      showTemporaryToast("No URL to share.");
    }
  };

  const handlePostComment = async (postId, text) => {
    if (!currentUser) {
      setIsLoginOpen(true);
      return;
    }
    if (!text.trim()) {
      showTemporaryToast("Comment cannot be empty.");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/posts/${postId}/comment`,
        { text },
        getAuthHeaders()
      );
      const updatedPost = res.data;
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.postId === updatedPost.postId ? updatedPost : p
        )
      );
      setComment("");
      showTemporaryToast("Comment published!");
    } catch (err) {
      console.error(`Error posting comment on post ${postId}:`, err);
      showTemporaryToast("Failed to post comment. Please try again.");
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    if (!currentUser) {
      setIsLoginOpen(true);
      return;
    }
    try {
      const res = await axios.delete(
        `${API_URL}/posts/${postId}/comment/${commentId}`,
        getAuthHeaders()
      );
      const updatedPost = res.data;
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.postId === updatedPost.postId ? updatedPost : p
        )
      );
      showTemporaryToast("Comment deleted successfully!");
    } catch (err) {
      console.error("Error deleting comment:", err);
      showTemporaryToast(
        "Error deleting comment. Please log in and ensure it's your comment."
      );
    }
  };

  const handleLogin = (user, token) => {
    setCurrentUser(user);
    setAuthToken(token);
    localStorage.setItem("blog_user", JSON.stringify(user));
    localStorage.setItem("blog_token", token);
    setIsLoginOpen(false);
    const newLikedState = {};
    posts.forEach((post) => {
      newLikedState[post.postId] = post.likedBy.some(
        (likedByUser) => likedByUser._id === user.id
      );
    });
    setLikedPostsState(newLikedState);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthToken(null);
    localStorage.removeItem("blog_user");
    localStorage.removeItem("blog_token");
    setLikedPostsState({});
  };

  return (
    <div className="bg-[#06294D] min-h-screen font-serif text-black relative">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto bg-[#fefcf6] p-8 rounded">
          <h1 className="text-4xl font-bold mb-8">All Posts</h1>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.postId}
                className="border p-5 rounded-lg bg-white shadow-md hover:shadow-2xl transition cursor-pointer"
                onClick={() => handleCardClick(post)}
              >
                <p className="text-sm text-gray-600">{post.timeToRead}</p>
                <h2 className="text-xl font-semibold my-2 text-blue-800 hover:underline">
                  {post.title}
                </h2>
                <p className="text-sm mb-4">{post.summary}</p>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{post.views || 0} views</span>
                  <span>{post.likes || 0} likes</span>
                  <span>{(post.comments || []).length} comments</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-2 rounded-full shadow-lg z-50 transition duration-300 ease-in-out">
          {toastMessage}
        </div>
      )}

      {selectedPost && (
        <div className="fixed inset-0 bg-opacity-10 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-h-[80vh] overflow-y-auto shadow-2xl rounded-2xl p-6 w-full max-w-3xl relative">
            <div
              onClick={() => setSelectedPost(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold cursor-pointer"
            >
              &times;
            </div>
            <h2 className="text-2xl font-bold mb-2">{selectedPost.title}</h2>
            <p className="text-sm text-gray-600 italic mb-4">
              {selectedPost.date}
            </p>
            <div className="text-gray-800 whitespace-pre-line leading-relaxed mb-6">
              {selectedPost.content || selectedPost.summary}
            </div>
            <div className="flex items-center gap-6 text-gray-700 mb-4">
              <div
                onClick={() => handleLike(selectedPost.postId)}
                className="cursor-pointer"
              >
                {likedPostsState[selectedPost.postId] ? (
                  <LikeIconSolid className="h-6 w-6 text-blue-600" />
                ) : (
                  <LikeIconOutline className="h-6 w-6 hover:text-blue-600" />
                )}
              </div>
              <div
                onClick={() => handleShare(selectedPost)}
                className="cursor-pointer"
              >
                <ClipboardDocumentCheckIcon className="h-6 w-6 hover:text-gray-600" />
              </div>
            </div>
            <div className="bg-[#fefcf8] p-4 rounded-lg font-serif border mt-8">
              <div className="text-lg font-semibold mb-2">Comments</div>
              <hr className="mb-3" />

              {currentUser && (
                <div className="text-sm mb-1 text-gray-600">
                  Commenting as <strong>{currentUser.name}</strong> (
                  {currentUser.email})
                </div>
              )}

              <div className="border p-3 rounded-md bg-white min-h-[50px]">
                <textarea
                  rows="3"
                  className="w-full outline-none resize-none"
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={!currentUser}
                />
                <div className="flex justify-between mt-2 text-gray-500">
                  <div className="space-x-2">
                    <i className="far fa-smile cursor-pointer"></i>
                    <i className="far fa-image cursor-pointer"></i>
                  </div>
                  <div>
                    {!currentUser ? (
                      <span
                        onClick={() => setIsLoginOpen(true)}
                        className="text-blue-600 cursor-pointer text-sm"
                      >
                        Log in to comment
                      </span>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={handleLogout}
                          className="text-red-500 hover:underline text-sm font-bold"
                        >
                          Logout
                        </button>
                        <button
                          onClick={() =>
                            handlePostComment(selectedPost.postId, comment)
                          }
                          className={`bg-blue-600 ml-4 text-white px-3 py-1 text-xs rounded text-center cursor-pointer ${
                            !comment.trim()
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-blue-700"
                          }`}
                          disabled={!comment.trim()}
                        >
                          Send
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              {(selectedPost.comments || []).map((cmt, idx) => (
                <div
                  key={cmt._id || idx}
                  className="flex justify-between items-center text-sm border-b border-gray-300 py-1"
                >
                  <p>
                    <span className="font-semibold text-xs text-gray-600">
                      {cmt.name}:
                    </span>{" "}
                    {cmt.text}
                  </p>
                  {currentUser?.id === cmt.user && (
                    <Trash2
                      className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                      size={18}
                      onClick={() =>
                        handleDeleteComment(selectedPost.postId, cmt._id)
                      }
                      title="Delete comment"
                    />
                  )}
                </div>
              ))}
            </div>

            <a
              href={selectedPost.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-6 text-blue-700 hover:underline"
            >
              🔗 Click here to view original post
            </a>
          </div>
        </div>
      )}

      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
