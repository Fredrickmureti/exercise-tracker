import React, { useState } from 'react';


const UserRegistration = ({ setUser }) => {

  const [username, setUsername] = useState(''); // store the username

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default submission

    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username }) // embedd the username in the body and send to the server for processing
    });
    if (response.ok){
      const user = await response.json();
      setUser(user); //set the user in the global state
      setUsername(''); //clear the input
    }else {
      console.error('Error Registering the user Error:', response.statusText);
    }
  }


  return (
    <div>
      <h2>Register User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={username}
          placeholder='Enter username'
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button
          type='submit'
        >Register</button>
      </form>
    </div>
  );
};


export default UserRegistration