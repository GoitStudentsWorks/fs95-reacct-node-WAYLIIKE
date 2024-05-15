import { createSlice } from '@reduxjs/toolkit';
import { signIn, signOut, signUp, current } from './userOps';
import toast from 'react-hot-toast';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      _id: null,
      name: null,
      email: null,
      avatarURL: null,
      gender: null,
      weight: null,
      activityTime: null,
      desiredVolume: null,
      createdAt: null,
      updatedAt: null,
    },
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        toast.success('Successfully registered!', {
          duration: 5000,
          position: 'top-center',
        });
      })
      .addCase(signIn.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = {
          _id: null,
          name: null,
          email: null,
          avatarURL: null,
          gender: null,
          weight: null,
          activityTime: null,
          desiredVolume: null,
          createdAt: null,
          updatedAt: null,
        };
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
      })
      .addCase(current.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(current.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(current.rejected, (state) => {
        state.isRefreshing = false;
      }),
});

export const userReducer = userSlice.reducer;
