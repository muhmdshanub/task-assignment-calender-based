// src/store/slices/userAuthSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  // Define the structure of userInfo here
  _id: string; // Example property
  name: string; // Example property
  role: string,
}

interface UserAuthState {
  userInfo: UserInfo | null;
}

const initialState: UserAuthState = {
  userInfo: JSON.parse(localStorage.getItem('task_user_Info') || 'null'), // Initialize from localStorage
};

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUserCredentials: (state, action: PayloadAction<{ userData: UserInfo }>) => {
      state.userInfo = action.payload.userData;
      localStorage.setItem('task_user_Info', JSON.stringify(action.payload.userData));
    },
    userLogout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('task_user_Info');
    },
  },
});

export const { setUserCredentials, userLogout } = userAuthSlice.actions;

export default userAuthSlice.reducer;
