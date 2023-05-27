import axios from 'axios';
import jwt_decode from 'jwt-decode';

const API_URL = 'http://localhost:8080/api/v1/auth';

const AuthService = {
  register: async (registerData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, registerData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  login: async (loginData) => {
    try {
      const response = await axios.post(`${API_URL}/authenticate`, loginData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: () => {
    // Remove tokens from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  getAccessToken: () => {
    return localStorage.getItem('accessToken');
  },

  setAccessToken: (token) => {
    localStorage.setItem('accessToken', token);
  },

  getRefreshToken: () => {
    return localStorage.getItem('refreshToken');
  },

  setRefreshToken: (token) => {
    localStorage.setItem('refreshToken', token);
  },

  isAccessTokenExpired: () => {
    const token = AuthService.getAccessToken();
    if (token) {
      const decodedToken = jwt_decode(token);
      return Date.now() >= decodedToken.exp * 1000;
    }
    return true;
  },
};

export default AuthService;
