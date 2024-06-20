import React from "react";

const Logout = ({setUser}) => {

  const handleLogout = () => {
    //clear the user state to null (logout)
    setUser(null);
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}


export default Logout;