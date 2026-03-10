import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import userReducer from './slices/userSlice';
import Cookies from 'js-cookie';

// Custom storage engine for cookies
const cookieStorage = {
  getItem: (key) => {
    return new Promise((resolve) => {
      try {
        const value = Cookies.get(key);
        resolve(value);
      } catch (error) {
        console.error('Error getting cookie:', error);
        resolve(null);
      }
    });
  },
  setItem: (key, value) => {
    return new Promise((resolve) => {
      try {
        Cookies.set(key, value, { expires: 30, path: '/' });
        resolve();
      } catch (error) {
        console.error('Error setting cookie:', error);
        resolve();
      }
    });
  },
  removeItem: (key) => {
    return new Promise((resolve) => {
      try {
        Cookies.remove(key, { path: '/' });
        resolve();
      } catch (error) {
        console.error('Error removing cookie:', error);
        resolve();
      }
    });
  },
};

// Configure persistence for user slice
const userPersistConfig = {
  key: 'user',
  storage: cookieStorage,
  whitelist: ['isLoggedIn', 'userData', 'userProfileData'], // Only persist these fields
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

