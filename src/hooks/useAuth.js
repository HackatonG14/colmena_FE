import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  customer_login, 
  customer_register, 
  get_user_info, 
  messageClear, 
  logout 
} from '../store/reducers/authReducer';
import { authService } from '../api/services';
import { STORAGE_KEYS } from '../utils/constants';
import toast from 'react-hot-toast';

/**
 * Custom hook for handling authentication
 * @returns {Object} Auth related methods and state
 */
const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { userInfo, loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  const isAuthenticated = !!userInfo;

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   */
  const registerUser = async (userData) => {
    dispatch(customer_register(userData));
  };

  /**
   * Login a user
   * @param {Object} credentials - User login credentials
   */
  const loginUser = async (credentials) => {
    dispatch(customer_login(credentials));
  };

  /**
   * Logout the current user
   */
  const logoutUser = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      dispatch(logout());
      navigate('/login');
      toast.success('Sesión cerrada correctamente');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get current user profile
   */
  const getUserProfile = () => {
    dispatch(get_user_info());
  };

  // Handle auth messages
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  return {
    isAuthenticated,
    userInfo,
    isLoading: isLoading || loader,
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile
  };
};

export default useAuth; 