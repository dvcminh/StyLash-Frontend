import React, { useContext, useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import AuthService from '../../Auth/AuthService'
import { AuthContext } from '../Context/AuthContext';

function PrivateRoute({ children }) {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const isLoggedIn = await authContext.checkUserLoggedIn();
    };
  
    checkUserLoggedIn();
  }, []);

  return authContext.isLoggedIn ? children : <Navigate to="/login" />
}

export default PrivateRoute