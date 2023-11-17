// src/components/AllPosts.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import the configuration variable file
import config from './config';
const apiBaseUrl = config.apiBaseUrl;



const AllPosts = () => {
 // to display error
  const [errorMessage, setErrorMessage] = useState(''); 

  const [posts, setPosts] = useState([]);

  // usestate for the comments

  const [comments, setComments] = useState({});

  const handleCommentChange = (postId, text) => {
   setComments({
     ...comments,
     [postId]: text,
   });
 };



  useEffect(() => {
   const fetchPosts = async () => {
    try {
     //get the token locally
      const token = localStorage.getItem('authToken');
      console.log('Token:', token); //display the token in the console for debugging
      const config = {
        headers: { 'auth-token': token }
      };

      console.log('Making GET request with Token:', token);
      const response = await axios.get(`${apiBaseUrl}/api/posts`, config);

      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Handle error here
    }
  };

    fetchPosts();
  }, []);

  //handle likes
  const handleLike = async (postId) => {
   try {
     const token = localStorage.getItem('authToken');
     await axios.patch(`${apiBaseUrl}/api/posts/like/${postId}`, {}, {
       headers: { 'auth-token': token }
     });
     // Optimistically update the UI
     setPosts(posts.map(post => {
       if (post._id === postId) {
         return { ...post, likes: post.likes + 1 }; // Increment likes
       }
       return post;
     }));
   } catch (error) {
    console.error('Error liking the post:', error.response ? error.response.data : error);
    
    const message = error.response && error.response.data ? error.response.data.error : 'An error occurred';
    setErrorMessage(message);
   }
 };

 //handle dislikes
 const handleDislike = async (postId) => {
  try {
    const token = localStorage.getItem('authToken');
    await axios.patch(`${apiBaseUrl}/api/posts/dislike/${postId}`, {}, {
      headers: { 'auth-token': token }
    });
    // Optimistically update the UI
    setPosts(posts.map(post => {
      if (post._id === postId) {
        return { ...post, dislikes: post.dislikeslikes + 1 }; // Increment dislikes
      }
      return post;
    }));
  } catch (error) {
   console.error('Error diskliking the post:', error.response ? error.response.data : error);
   const message = error.response && error.response.data ? error.response.data.error : 'An error occurred';
   setErrorMessage(message);
  }
};

// add a coments to the posts
const submitComment = async(postId) =>{
try{
 const token = localStorage.getItem('authToken')
 const commentText = comments[postId];
 await axios.patch(`${apiBaseUrl}/api/posts/comment/${postId}`, {text: commentText},{
  headers: { 'auth-token': token }
 });

 // clear  the comments input after submission
 setComments({
  ...comments,
  [postId]:''
 });

} catch (error) {
 console.error('Error submitting comment:', error.response ? error.response.data : error);
 const message = error.response && error.response.data ? error.response.data.error : 'An error occurred';
 setErrorMessage(message);
 }
};

//delete the posts

const handleDelete = async (postId) => {
 try {
   const token = localStorage.getItem('authToken');
   await axios.delete(`${apiBaseUrl}/api/posts/${postId}`, {
     headers: { 'auth-token': token }
   });
   // Update the UI by filtering out the deleted post
   setPosts(posts.filter(post => post._id !== postId));
 } catch (error) {
   console.error('Error deleting the post:', error.response ? error.response.data : error);
   const message = error.response && error.response.data ? error.response.data.Message : 'An error occurred';
   setErrorMessage(message);
 }
};





 return (
   <div>
     <h1>All Posts</h1>
     {errorMessage && (
      <div style={{ color: 'red', margin: '10px 0', padding: '10px', border: '1px solid red', backgroundColor: '#ffe6e6' }}>
        {errorMessage}
     </div>
     )}
     <div>
       {posts.map((post) => (
         <div key={post._id}>
           <h2>{post.title}</h2>
           <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
           <p>Time left: {post.timeLeft} minutes</p>
           {post.status === 'Expired' && <p>Expired on: {new Date(post.expiredAt).toLocaleDateString()}</p>}
           <p>{post.text}</p>
           <p>Hashtag: {post.hashtag}</p>
           <p>Location: {post.location}</p>
           <p>URL: <a href={post.url} target="_blank" rel="noopener noreferrer">{post.url}</a></p>
           <p>Topic: {post.topic}</p>

           <div>
      Liked by:
      <ul>
        {post.likedBy.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
    <div>
      Disliked by:
      <ul>
        {post.dislikedBy.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>



           <p>Likes: {post.likes}</p>
           <p>Dislikes: {post.dislikes}</p>
           <p>Posted by: {post.user}</p>
           <p>Status: {post.status}</p>
           <p>Date: {post.date}</p>

           <p><button onClick={() => handleLike(post._id)}>Like</button></p>
           <p><button onClick={() => handleDislike(post._id)}>Dislike</button></p>
           <p><button onClick={() => handleDelete(post._id)}>Delete</button></p>
       
           <textarea
               value={comments[post._id] || '' }
               onChange={(e) => handleCommentChange (post._id, e.target.value)}
               placeholder="write a comment"
               />
               <button onClick={() => submitComment(post._id)}>Submit Comment</button>
               {post.comments.map((comment, index) => (
               <div key={index}>
                <strong>Comment by: {comment.commentedBy}</strong>
                <p>{comment.text}</p>

               
              </div>
       ))}
   </div>
   ))}
   </div>
   </div>
 );
};

export default AllPosts;