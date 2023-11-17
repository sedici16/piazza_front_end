import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Import the configuration variable file
import config from './config';
const apiBaseUrl = config.apiBaseUrl;

const PostsByTopic = () => {
  const { topic } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch and display posts by the selected topic
    const token = localStorage.getItem('authToken');
    const config = {
      headers: { 'auth-token': token },
    };

    const fetchPostsByTopic = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/posts/topics/${topic}`, config);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts by topic:', error);
        // Handle error here
      }
    };

    fetchPostsByTopic();
  }, [topic]);

  return (
    <div>
      <h1>Posts by Topic: {topic}</h1>
      <div>
        {posts.map((post) => (
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

            {/* Display comments for each post */}
            <div>
              {post.comments && post.comments.map((comment, index) => (
                <div key={index}>
                  <strong>Comment by: {comment.commentedBy}</strong>
                  <p>{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsByTopic;
