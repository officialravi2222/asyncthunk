import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userRegister: {},
  isLoading: false
};

export const registerUser = createAsyncThunk('student/user/registerUser', async (data, thunkAPI) => {
  try {
    const response = await axios.post(' http://localhost:3100/api/users/signup', data);
    console.log(response.data);

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

export const getuSerDetails = createAsyncThunk('student/user/getUser', async (data, thunkAPI) => {
  try {
    const response = await axios.post(' http://localhost:3100/api/users/signup', data);
    console.log(response.data);
    console.warn("loading",state.isLoading)
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

// login/otp/verification
const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsersData: (state) => {
      state.userRegister = { name: 'ravi' };
    }
  },

  extraReducers: (builder) => {
    builder
      // register state
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userRegister = payload.data;
        state.userRegister.created = payload.success;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isLoading = false;
        console.log(payload);
      })
      .addCase(getuSerDetails.pending, (state) => {
        state.isLoading = true;
      });
  }
});

export const { setUsersData } = usersSlice.actions;
export default usersSlice.reducer;
