import { createSlice } from '@reduxjs/toolkit';
import {
  addWater,
  deleteWater,
  getDayWater,
  getMonthWater,
  putWater,
} from './waterOps';

import toast from 'react-hot-toast';

const waterSlice = createSlice({
  name: 'water',
  initialState: {
    date: null,
    totalDayWater: 0,
    items: [],
    monthItems: [],
    loading: false,
    error: false,
  },
  extraReducers: (builer) =>
    builer
      .addCase(addWater.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.totalDayWater += action.payload.amount;
        toast.success('Added water successfully!', {
          duration: 5000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      })
      .addCase(addWater.rejected, (state) => {
        state.loading = false;
        state.error = true;
        toast.error('Failed'),
          {
            duration: 5000,
            position: 'top-center',
            style: {
              textAlign: 'center',
              boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
            },
          };
      })
      .addCase(deleteWater.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload._id;
        const deletedWaterIndex = state.items.findIndex(
          (item) => item._id === id
        );
        if (deletedWaterIndex !== -1) {
          state.totalDayWater -= state.items[deletedWaterIndex].amount;
          state.items.splice(deletedWaterIndex, 1);
          toast.success('Deleted water successfully!', {
            duration: 5000,
            position: 'top-center',
            style: {
              textAlign: 'center',
              boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
            },
          });
        }
      })
      .addCase(deleteWater.rejected, (state) => {
        state.loading = false;
        state.error = true;
        toast.error('Failed to delete water.', {
          duration: 5000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      })
      .addCase(putWater.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(putWater.fulfilled, (state, action) => {
        state.loading = false;

        const updatedWaterIndex = state.items.findIndex(
          (item) => item._id === action.payload._id
        );

        if (updatedWaterIndex !== -1) {
          const prevWater = state.items[updatedWaterIndex];

          state.items[updatedWaterIndex] = action.payload;

          state.totalDayWater += action.payload.amount - prevWater.amount;
        }
        toast.success('Updated water successfully!', {
          duration: 5000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      })
      .addCase(putWater.rejected, (state) => {
        state.loading = false;
        state.error = true;
        toast.error('Failed to update water.', {
          duration: 5000,
          position: 'top-center',
          style: {
            textAlign: 'center',
            boxShadow: '8px 11px 27px -8px rgba(66, 68, 90, 1)',
          },
        });
      })
      .addCase(getDayWater.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getDayWater.fulfilled, (state, action) => {
        state.loading = false;
        state.date = action.payload.date;
        state.totalDayWater = action.payload.totalDayWater;
        state.items = action.payload.consumedWaterData;
      })
      .addCase(getDayWater.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getMonthWater.fulfilled, (state, action) => {
        state.monthItems = action.payload;
      })
      .addCase(getMonthWater.rejected, (state) => {
        state.error = true;
      }),
});

export const waterReducer = waterSlice.reducer;
