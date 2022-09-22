import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApiService from '@/api/authApiService';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorage';

const AUTH_LOGIN = 'auth/LOGIN';
const AUTH_LOGOUT = 'auth/LOGOUT';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  isAuthenticated: false,
  currentUser: {
    accessToken: '',
    user: {
      email: '',
      id: null,
    },
  },
};

const loginMiddleware = createAsyncThunk(
  AUTH_LOGIN,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const loginResponse = await authApiService.login({ email, password });

      const { accessToken } = loginResponse;
      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);

      return loginResponse;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const logoutMiddleware = createAsyncThunk(AUTH_LOGOUT, async () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

  return INITIAL_STATE.currentUser;
});

export const AUTH_REDUCER_NAME = 'auth';

const authSlice = createSlice({
  name: AUTH_REDUCER_NAME,
  initialState: INITIAL_STATE,
  extraReducers: {
    [loginMiddleware.pending]: state => {
      state.isLoading = true;
    },
    [loginMiddleware.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    [loginMiddleware.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [logoutMiddleware.fulfilled]: (state, action) => {
      state.isAuthenticated = false;
      state.currentUser = action.payload;
    },
  },
});

export const authActions = { loginMiddleware, logoutMiddleware };

export default authSlice.reducer;
