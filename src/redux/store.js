import { configureStore } from '@reduxjs/toolkit';
import performanceReducer from './slices/performanceSlice';

export const store = configureStore({
  reducer: {
    performance: performanceReducer,
  },
});
