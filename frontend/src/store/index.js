import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '@/store/modules/auth';

const { MODE } = import.meta.env;

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: MODE === 'development',
});

export default store;
