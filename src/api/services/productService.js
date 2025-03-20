import apiClient from '../api';
import { API_ENDPOINTS } from '../../utils/constants';

/**
 * Product Service - Handles all product related API calls
 */
const productService = {
  /**
   * Get all products
   * @param {Object} params - Query parameters for filtering
   * @returns {Promise} - Response from API
   */
  getProducts: async (params = {}) => {
    return apiClient.get(API_ENDPOINTS.PRODUCTS, { params });
  },
  
  /**
   * Get product by slug
   * @param {string} slug - Product slug
   * @returns {Promise} - Response from API
   */
  getProductBySlug: async (slug) => {
    return apiClient.get(`${API_ENDPOINTS.PRODUCTS}/${slug}`);
  },
  
  /**
   * Get related products
   * @param {string} productId - Product ID
   * @returns {Promise} - Response from API
   */
  getRelatedProducts: async (productId) => {
    return apiClient.get(`${API_ENDPOINTS.PRODUCTS}/related/${productId}`);
  },
  
  /**
   * Get featured products
   * @returns {Promise} - Response from API
   */
  getFeaturedProducts: async () => {
    return apiClient.get(`${API_ENDPOINTS.PRODUCTS}/featured`);
  },
  
  /**
   * Search products
   * @param {string} query - Search query
   * @param {Object} filters - Additional filters
   * @returns {Promise} - Response from API
   */
  searchProducts: async (query, filters = {}) => {
    return apiClient.get(`${API_ENDPOINTS.PRODUCTS}/search`, { 
      params: { query, ...filters } 
    });
  },
  
  /**
   * Get products by category
   * @param {string} categoryId - Category ID
   * @param {Object} params - Additional query parameters
   * @returns {Promise} - Response from API
   */
  getProductsByCategory: async (categoryId, params = {}) => {
    return apiClient.get(`${API_ENDPOINTS.CATEGORIES}/${categoryId}/products`, { 
      params 
    });
  }
};

export default productService; 