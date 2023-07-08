import React, { useContext, useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthService from '../../Auth/AuthService'
import { AuthContext } from '../Context/AuthContext';
import { NotificationContext } from '../Context/NotificationContext';

function PrivateRoute({ children }) {
  const { setNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext); 

  const handleIsntLoggedIn = () => {
    navigate("/");
    setNotification({
      message: "You must login to access this page!",
      position: "top-right",
    });
  }

  return authContext.isLoggedIn ? children : handleIsntLoggedIn();
}

export default PrivateRoute