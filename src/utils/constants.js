/**
 * Application constants
 */

// App name
export const APP_NAME = 'Colmena';

// API URLs based on environment
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Routes for navigation
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  SHOPS: '/shops',
  CARD: '/card',
  PRODUCTS: '/products',
  SEARCH: '/products/search',
  PRODUCT_DETAILS: '/product/details',
  ORDER_CONFIRM: '/order/confirm',
  DASHBOARD: '/dashboard',
};

// Storage keys
export const STORAGE_KEYS = {
  TOKEN: 'customerToken',
  USER: 'user',
};

// API endpoints for services
export const API_ENDPOINTS = {
  AUTH: '/customer',
  PRODUCTS: '/home/products',
  CATEGORIES: '/home/categorys',
  ORDERS: '/home/order',
  USERS: '/customer',
  CART: '/home/cart',
  WISHLIST: '/home/wishlist',
  REVIEWS: '/home/reviews',
};

// Toast notification config
export const TOAST_DURATION = 3000;

// Pagination settings
export const PAGINATION = {
  ITEMS_PER_PAGE: 12,
  MAX_PAGES: 5,
};

// Cart settings
export const CART = {
  MAX_QUANTITY: 10,
  MIN_QUANTITY: 1,
  SHIPPING_FEE: 5,
};

// Theme settings
export const THEME = {
  PRIMARY_COLOR: '#FFB800',
  SECONDARY_COLOR: '#2C3E50',
  SUCCESS_COLOR: '#28A745',
  ERROR_COLOR: '#DC3545',
  WARNING_COLOR: '#FFC107',
  INFO_COLOR: '#17A2B8',
}; 