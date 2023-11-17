// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // set the topics variables for the drop-down box
  const [selectedTopic, setSelectedTopic] = useState('Tech'); // default topic
  const [topics, setTopics] = useState(['Politics', 'Health', 'Sport', 'Tech']);

  const navigate = useNavigate();

  // trigger the change in topic
  const handleTopicChange = (e) => {
    const newTopic = e.target.value;
    navigate(`/posts-by-topic/${newTopic}`);
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <div>
      <Link to="/create-post" style={{ marginRight: '10px' }}>
          cetate a post
        </Link>
        <Link to="/all-posts" style={{ marginRight: '10px' }}>
          View All Posts
        </Link>
        <Link to="/expired-posts-history" style={{ marginRight: '10px' }}>
          View All Expired Posts
        </Link>
        <Link to="/most-liked-posts" style={{ marginRight: '10px' }}>
          View Most Liked Posts
        </Link>
        <label>Select a Topic: </label>
        <select value={selectedTopic} onChange={handleTopicChange}>
          {/* Add an additional option for the default topic "Tech" */}
          <option value="Tech">Tech</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dashboard;
