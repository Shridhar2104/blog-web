// routes/posts.js
const express = require('express');
const router = express.Router();

let posts = [];

// Create a new blog post
router.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.json(newPost);
});

// Get all blog posts
router.get('/posts', (req, res) => {
  res.json(posts);
});

// Get a specific blog post by ID
router.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

// Update a specific blog post by ID
router.put('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const updatedPostIndex = posts.findIndex((p) => p.id === postId);
  if (updatedPostIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const updatedPost = { ...posts[updatedPostIndex], ...req.body };
  posts[updatedPostIndex] = updatedPost;
  res.json(updatedPost);
});

// Delete a specific blog post by ID
router.delete('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((p) => p.id !== postId);
  res.json({ message: 'Post deleted successfully' });
});

module.exports = router;
