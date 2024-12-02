# React Application: Blog Management System

This is a **React** application for managing blog posts with features like user registration, dashboards, post creation, and analytics. The app is structured using **React Router** for navigation and supports dynamic routes for topic-based post filtering.

## Key Features
- **User Registration**: Registration form for new users (`/register`).
- **Dashboard**: User dashboard summarizing blog activities (`/dashboard`).
- **All Posts**: View all published blog posts (`/all-posts`).
- **Expired Posts History**: Track posts that are no longer active (`/expired-posts-history`).
- **Most Liked Posts**: Display posts with the highest likes (`/most-liked-posts`).
- **Posts by Topic**: Filter and display posts by topic (`/posts-by-topic/:topic`).
- **Create Post**: Form for adding new blog posts (`/create-post`).

## Code Snippet
```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AllPosts from './components/AllPosts';
import ExpiredPostsHistory from './components/ExpiredPostsHistory';
import MostLikedPosts from './components/MostLikedPosts';
import PostsByTopic from './components/PostByTopics';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} /> {/* Redirect to /register */}
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/all-posts" element={<AllPosts />} />
        <Route path="/expired-posts-history" element={<ExpiredPostsHistory />} />
        <Route path="/most-liked-posts" element={<MostLikedPosts />} />
        <Route path="/posts-by-topic/:topic" element={<PostsByTopic />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
