import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {API_URL} from '../const';

export const fetchGoods = createAsyncThunk(
  'goods/fetchGoods',
  async (params) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/api/products${queryString ? `?${queryString}` : ''}`);
    const data = await response.json();
    return data;
  },
);

const initialState = {
  items: [],
  status: 'idle',
  error: null,
}

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.status = 'successed';
        state.items = action.payload;
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});


export default goodsSlice.reducer;