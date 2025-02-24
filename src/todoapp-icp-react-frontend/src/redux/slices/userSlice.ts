import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IUser } from '../../utils/types';

const initialState: IUser | null = null;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPrincipalId: (state: IUser | null, action: PayloadAction<string>) => {
      if (state) {
        state.principalId = action.payload;
      } else {
        state = {
          principalId: action.payload,
        };
      }
    },
    setUsername: (state: IUser | null, action: PayloadAction<string>) => {
      if (state) {
        state.username = action.payload;
      } else {
        state = {
          principalId: action.payload,
        };
      }
    },
    setUser: (state: IUser | null, action: PayloadAction<IUser | null>) => {
      state = action.payload;
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { setPrincipalId, setUser, setUsername } = userSlice.actions;

export default userSlice.reducer;
