import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AllPosts from './components/AllPosts';
import ExpiredPostsHistory  from './components/ExpiredPostsHistory';
import MostLikedPosts from './components/MostLikedPosts';
import PostsByTopic from './components/PostByTopics';
import CreatePost from './components/CreatePost';
// Import other components as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} /> {/* Redirect from / to /register */}
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/all-posts" element={<AllPosts />} />
        <Route path="/expired-posts-history" element={<ExpiredPostsHistory />} />
        <Route path="/most-liked-posts" element={<MostLikedPosts />} />
        <Route path="/posts-by-topic/:topic" element={<PostsByTopic />} />
        <Route path="/create-post" element={<CreatePost />} />

        {/* ... other routes ... */}
      </Routes>
    </Router>
  );
}

export default App;
