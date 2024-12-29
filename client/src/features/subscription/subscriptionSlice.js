import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get subscription status
export const getSubscriptionStatus = createAsyncThunk(
  'subscription/getStatus',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return thunkAPI.rejectWithValue('No token found');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${API_URL}/payments/subscription-status`,
        config
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create payment order
export const createPaymentOrder = createAsyncThunk(
  'subscription/createOrder',
  async (orderData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return thunkAPI.rejectWithValue('No token found');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${API_URL}/payments/create-order`,
        orderData,
        config
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Verify payment
export const verifyPayment = createAsyncThunk(
  'subscription/verifyPayment',
  async (paymentData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return thunkAPI.rejectWithValue('No token found');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${API_URL}/payments/verify`,
        paymentData,
        config
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  subscription: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get subscription status cases
      .addCase(getSubscriptionStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubscriptionStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subscription = action.payload.subscription;
      })
      .addCase(getSubscriptionStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create payment order cases
      .addCase(createPaymentOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPaymentOrder.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Verify payment cases
      .addCase(verifyPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subscription = action.payload.subscription;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
