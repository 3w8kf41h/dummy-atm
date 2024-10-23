import { configureStore, ThunkAction, Action, ListenerMiddleware } from '@reduxjs/toolkit';
import { MMKV } from 'react-native-mmkv';
import vaultReducer from '../features/vault/vaultSlice';

const mmkv = new MMKV();

const storageMiddleware: ListenerMiddleware = () => next => action => {
  const result = next(action);
  mmkv.set('redux-state', JSON.stringify(store.getState()));
  return result;
};

const savedState = mmkv.getString('redux-state');

export const store = configureStore({
  reducer: {
    vault: vaultReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(storageMiddleware),
  ...(savedState ? { preloadedState: JSON.parse(savedState) } : {}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
