import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import thunk from 'redux-thunk';
import authReducer, { AUTH_REDUCER_NAME } from '@/store/modules/auth';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [AUTH_REDUCER_NAME],
};

const { MODE } = import.meta.env;

const rootReducer = combineReducers({ [AUTH_REDUCER_NAME]: authReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
  devTools: MODE === 'development',
});

const persistor = persistStore(store);

const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
