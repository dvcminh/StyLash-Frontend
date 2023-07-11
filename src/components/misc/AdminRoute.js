import React, { useContext, useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthService from '../../Auth/AuthService'
import { AuthContext } from '../Context/AuthContext';
import { NotificationContext } from '../Context/NotificationContext';

function AdminRoute({ children }) {
  const { setNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext); 

  const handleIsntLoggedIn = () => {
    navigate("/");
    setNotification({
      message: "You cannot view this page!",
      position: "top-right",
    });
  }

  return authContext.role === "ADMIN" ? children : handleIsntLoggedIn();
}

export default AdminRoute