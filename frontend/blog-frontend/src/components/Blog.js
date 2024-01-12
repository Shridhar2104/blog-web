import React from 'react';

const Blog = ({ post, onBackClick ,onDeleteClick}) => {
  return (
    <div className="single-blog-view">
      <button onClick={onBackClick}>Back to Blog List</button>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={() => onDeleteClick(post.id)}>Delete</button>
    </div>
  );
};

export default Blog;