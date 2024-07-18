import React, { useState, useEffect } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';

const withUserId = (WrappedComponent) => {
  return (props) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt_decode(token);
        setUserId(decodedToken._id);
      }
    }, []);

    if (!userId) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} userId={userId} />;
  };
};

export default withUserId;