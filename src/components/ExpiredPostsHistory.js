import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import the configuration variable file
import config from './config';
const apiBaseUrl = config.apiBaseUrl;

const ExpiredPostsHistory = () => {
  const [expiredPosts, setExpiredPosts] = useState([]);

  useEffect(() => {
    const fetchExpiredPosts = async () => {
      try {
        // Retrieve the token from localStorage
        const authToken = localStorage.getItem('authToken');
        console.log('Token:', authToken); // Display the token in the console for debugging
        const config = {
          headers: { 'auth-token': authToken }
        };

        console.log('Making GET request for expired posts with Token:', authToken);
        const response = await axios.get(`${apiBaseUrl}/api/posts/expired-posts-history`, config);
        setExpiredPosts(response.data);
      } catch (error) {
        console.error('Error fetching expired posts:', error);
        // Handle error here
      }
    };

    fetchExpiredPosts();
  }, []);

  return (
   <div>
   <h1>Expired Posts History</h1>
   <div>
     {expiredPosts.map((post) => (
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

export default ExpiredPostsHistory;
