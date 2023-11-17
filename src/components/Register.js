// src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';

// to redirect to pages programmatically
import { useNavigate } from 'react-router-dom';

// import the configuration variable file
import config from './config';
const apiBaseUrl = config.apiBaseUrl;


//register user
const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

// Login state
const [login, setLogin] = useState({
      email: '',
      password: '',
    });

  //err messages 
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  //declare the usehistory hook
  const navigate = useNavigate();


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}/api/user/register`, user);
      console.log(response.data);
      setSuccessMessage('You have successfully registered!');
      // Redirect to login page or display success message
    } catch (error) {
      if (error.response){
//extract the error from the backend
         const errorMessage= error.response.data.message;
         setErrorMessage(errorMessage);
     }else{
      //other error handling
      setErrorMessage('an error has occured please try gain')

     }


      console.error(error);
      // Handle registration errors
    }
  };

const handleLogin =async(e)=>{
  e.preventDefault();
  try{

    const response= await axios.post(`${apiBaseUrl}/api/user/login`, login);
   
    console.log('Login Response:', response);
    setSuccessMessage('you have sucessfully logged in')

    setErrorMessage('');

    //store the token locally for subsequent use
    const authToken = response.data['auth-token'];
    localStorage.setItem('authToken', authToken);
    console.log('Token:', authToken); // Log the token value to the console


    //redirect action
    navigate('/dashboard'); // Redirect after successful login
    } catch (error){
    //error handling
    if (error.response){
      //extract the error from the backend
               const errorMessage= error.response.data.message;
               setErrorMessage(errorMessage);
           }else{
            //other error handling
            setErrorMessage('an error has occured please try gain')
      
           }
 
           console.error(error);
          // Handle registration errors
}
};


  // Define styles for the container
  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh', // This makes the container take up the full height of the viewport
  };

  // Define styles for the form itself
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px', // Set a fixed width for the form
    alignItems: 'center',
    padding: '20px', // Add some padding
  };

  return (
    <div style={formContainerStyle}>
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} 
      <form onSubmit={handleSubmit} style={formStyle}>
        <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" required />
        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    
    {/* Login Form */}
    <form onSubmit={handleLogin} style={formStyle}>
        <input type="email" name="email" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} placeholder="Email" required />
        <input type="password" name="password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>

    </div>
  );
};

export default Register;
