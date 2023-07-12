import { configureStore, combineReducers } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';

import settingsReducer from './settingsSlice';

const rootReducer = combineReducers({
  weather: weatherReducer,
  settings: settingsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const setupStore = () => store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
