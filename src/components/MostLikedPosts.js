import React, { useState, useEffect } from 'react';
import axios from 'axios';


// import the configuration variable file
import config from './config';
const apiBaseUrl = config.apiBaseUrl;

const MostlikedPosts = () => {
  const [mostlikedPosts, setMostlikedPosts] = useState([]);

  useEffect(() => {
    const fetchMostlikedPosts = async () => {
      try {
        // Retrieve the token from localStorage
        const authToken = localStorage.getItem('authToken');
        console.log('Token:', authToken); // Display the token in the console for debugging
        const config = {
          headers: { 'auth-token': authToken }
        };

        console.log('Making GET request for most liked posts with Token:', authToken);
        const response = await axios.get(`${apiBaseUrl}/api/posts/most-liked-posts`, config);
        setMostlikedPosts(response.data);
      } catch (error) {
        console.error('Error fetching most liked posts:', error);
        // Handle error here
      }
    };

    fetchMostlikedPosts();
  }, []);

  return (
    <div>
      <h1>Most liked Posts</h1>
      <div>
        {mostlikedPosts.map((post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
            <p>Hashtag: {post.hashtag}</p>
            <p>Location: {post.location}</p>
            <p>URL: <a href={post.url} target="_blank" rel="noopener noreferrer">{post.url}</a></p>
            <p>Topic: {post.topic}</p>
            <p>Likes: {post.likes}</p>
            <p>Dislikes: {post.dislikes}</p>
            <p>Posted by: {post.user}</p>
            <p>Status: {post.status}</p>
            <p>Date: {post.date}</p>
            {/* Add more fields as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostlikedPosts;
