import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

// Типізація кореневого стану
export type RootState = ReturnType<typeof store.getState>;

// Типізація Dispatch
export type AppDispatch = typeof store.dispatch;

// Тип для асинхронних дій
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
