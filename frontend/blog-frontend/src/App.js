import React, { useState, useEffect } from 'react';
import './App.css';
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlog';
function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await fetch('http://localhost:3000/api/posts');
      const posts = await response.json();
      setPosts(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };
  const handleDeleteClick = async (postId) => {
    try {
      await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: 'DELETE',
      });
      // Refresh the list after deleting
      fetchPosts();
      // Clear selected post
      setSelectedPost(null);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  const handleAddBlog = async (newPost) => {
    try {
      await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      // Refresh the list after adding
      fetchPosts();
      // Clear selected post and show blog list
      setSelectedPost(null);
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Blog Website</h1>
      </header>

      <div className="post-container">
        {isAdding ? (
          <AddBlogForm onAdd={handleAddBlog} />
        ) : selectedPost ? (
          <Blog
            post={selectedPost}
            onBackClick={handleBackClick}
            onDeleteClick={handleDeleteClick}
          />
        ) : (
          posts.length === 0 ? (
            <p>No blog posts found.</p>
          ) : (
            <div>
              {posts.map((post) => (
                <div key={post.id} className="post">
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                  <button onClick={() => handlePostClick(post)}>View</button>
                  <button onClick={() => handleDeleteClick(post.id)}>Delete</button>
                </div>
              ))}
              <button onClick={() => setIsAdding(true)}>Add Blog</button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
