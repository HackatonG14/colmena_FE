import apiClient from '../api';
import { API_ENDPOINTS } from '../../utils/constants';

/**
 * Auth Service - Handles all authentication related API calls
 */
const authService = {
  /**
   * Login user
   * @param {Object} credentials - User credentials
   * @returns {Promise} - Response from API
   */
  login: async (credentials) => {
    return apiClient.post(`${API_ENDPOINTS.AUTH}/login`, credentials);
  },
  
  /**
   * Register user
   * @param {Object} userData - User registration data
   * @returns {Promise} - Response from API
   */
  register: async (userData) => {
    return apiClient.post(`${API_ENDPOINTS.AUTH}/register`, userData);
  },
  
  /**
   * Logout user
   * @returns {Promise} - Response from API
   */
  logout: async () => {
    return apiClient.get(`${API_ENDPOINTS.AUTH}/logout`);
  },
  
  /**
   * Get current user info
   * @returns {Promise} - Response from API
   */
  getUserProfile: async () => {
    return apiClient.get(`${API_ENDPOINTS.USERS}/profile`);
  },
  
  /**
   * Update user profile
   * @param {Object} userData - User data to update
   * @returns {Promise} - Response from API
   */
  updateUserProfile: async (userData) => {
    return apiClient.put(`${API_ENDPOINTS.USERS}/profile`, userData);
  },
  
  /**
   * Change user password
   * @param {Object} passwordData - Password information
   * @returns {Promise} - Response from API
   */
  changePassword: async (passwordData) => {
    return apiClient.put(`${API_ENDPOINTS.USERS}/change-password`, passwordData);
  }
};

export default authService; 