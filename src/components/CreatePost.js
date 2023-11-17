// createPost.js
import React, { useState } from 'react';
import axios from 'axios';

import config from './config';
const apiBaseUrl = config.apiBaseUrl;

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: '',
    text: '',
    hashtag: '',
    location: '',
    url: '',
    topic: 'Politics', // You can set a default topic here if needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create a new post

      const authToken = localStorage.getItem('authToken');
         

      console.log('Token:', authToken); // Display the token in the console for debugging
      const config = {
        headers: { 'auth-token': authToken }
      };

      const response = await axios.post(`${apiBaseUrl}/api/posts/`, postData, config);
      

      // Handle the response (e.g., show a success message)
      console.log('New post created:', response.data);
      console.log('this is the post title', postData )

      // Clear the form or navigate to a different page if needed
      setPostData({
        title: '',
        text: '',
        hashtag: '',
        location: '',
        url: '',
        topic: 'Politics', // Reset the topic to the default
      });
    } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data : error);

      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={postData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Text:</label>
          <textarea name="text" value={postData.text} onChange={handleChange} />
        </div>
        <div>
          <label>Hashtag:</label>
          <input type="text" name="hashtag" value={postData.hashtag} onChange={handleChange} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={postData.location} onChange={handleChange} />
        </div>
        <div>
          <label>URL:</label>
          <input type="text" name="url" value={postData.url} onChange={handleChange} />
        </div>
        <div>
          <label>Topic:</label>
          <select name="topic" value={postData.topic} onChange={handleChange}>
            <option value="Politics">Politics</option>
            <option value="Health">Health</option>
            <option value="Sport">Sport</option>
            <option value="Tech">Tech</option>
          </select>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
