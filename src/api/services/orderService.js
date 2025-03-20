import apiClient from '../api';
import { API_ENDPOINTS } from '../../utils/constants';

/**
 * Order Service - Handles all order related API calls
 */
const orderService = {
  /**
   * Place an order
   * @param {Object} orderData - Order data
   * @returns {Promise} - Response from API
   */
  placeOrder: async (orderData) => {
    return apiClient.post(`${API_ENDPOINTS.ORDERS}/place-order`, orderData);
  },
  
  /**
   * Get user orders
   * @returns {Promise} - Response from API
   */
  getUserOrders: async () => {
    return apiClient.get(`${API_ENDPOINTS.ORDERS}/my-orders`);
  },
  
  /**
   * Get order details
   * @param {string} orderId - Order ID
   * @returns {Promise} - Response from API
   */
  getOrderDetails: async (orderId) => {
    return apiClient.get(`${API_ENDPOINTS.ORDERS}/${orderId}`);
  },
  
  /**
   * Confirm order
   * @param {string} orderId - Order ID
   * @returns {Promise} - Response from API
   */
  confirmOrder: async (orderId) => {
    return apiClient.get(`${API_ENDPOINTS.ORDERS}/confirm/${orderId}`);
  }
};

export default orderService; 