// AddBlogForm.js
import React, { useState } from 'react';

const AddBlogForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if title and content are not empty
    if (title.trim() === '' || content.trim() === '') {
      return;
    }
    // Call the onAdd function with the new blog post
    onAdd({ title, content });
    // Clear the form
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <button type="submit">Add Blog</button>
    </form>
  );
};

export default AddBlogForm;
