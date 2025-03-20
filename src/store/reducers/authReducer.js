import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../../api/services";
import { jwtDecode } from "jwt-decode";
import { STORAGE_KEYS } from "../../utils/constants";
import { getErrorMessage } from "../../utils/helpers";

/**
 * Helper function to decode JWT token
 * @param {string} token - JWT token
 * @returns {Object} - Decoded token
 */
const decodeToken = (token) => {
  try {
    // Si es un token de demostración, devolver un objeto de usuario ficticio
    if (token && (token.startsWith('demo_token_'))) {
      return {
        id: 'demo_user_id',
        name: 'Usuario Demo',
        email: token.includes('register') ? 'nuevo@example.com' : 'demo@example.com',
        role: 'customer'
      };
    }
    
    // De lo contrario, intentar decodificar normalmente
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
};

/**
 * Register a new customer
 */
export const customer_register = createAsyncThunk(
  'auth/customer_register',
  async (userData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await authService.register(userData);
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Login a customer
 */
export const customer_login = createAsyncThunk(
  'auth/customer_login',
  async (credentials, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await authService.login(credentials);
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Get current user information
 */
export const get_user_info = createAsyncThunk(
  'auth/get_user_info',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await authService.getUserProfile();
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Initial state
const initialState = {
  loader: false,
  userInfo: null,
  errorMessage: '',
  successMessage: '',
  token: localStorage.getItem(STORAGE_KEYS.TOKEN) || ''
};

// Check if there's a token and decode it for initial state
if (initialState.token) {
  const decodedToken = decodeToken(initialState.token);
  if (decodedToken) {
    initialState.userInfo = decodedToken;
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    messageClear: (state) => {
      state.errorMessage = '';
      state.successMessage = '';
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = '';
      // Remove token from localStorage when logging out
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    },
    // Alias para logout para mantener compatibilidad
    user_reset: (state) => {
      state.userInfo = null;
      state.token = '';
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    }
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(customer_register.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(customer_register.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.userInfo = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.token = payload.token;
    });
    builder.addCase(customer_register.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload;
    });

    // Login
    builder.addCase(customer_login.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(customer_login.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.userInfo = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.token = payload.token;
    });
    builder.addCase(customer_login.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload;
    });

    // Get user info
    builder.addCase(get_user_info.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(get_user_info.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.userInfo = payload.user;
    });
    builder.addCase(get_user_info.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload;
    });
  }
});

export const { messageClear, logout, user_reset } = authSlice.actions;
export default authSlice.reducer;