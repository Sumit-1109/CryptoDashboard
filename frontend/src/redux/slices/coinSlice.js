import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCoinList,
  fetchMarketChart,
  fetchTopGainer,
  fetchTopLoser,
} from '../../service/api';

export const getCoinList = createAsyncThunk('coins/getCoinList', fetchCoinList);
export const getMarketChart = createAsyncThunk('coins/getMarketChart', ({ id, days }) =>
  fetchMarketChart(id, days)
);
export const getTopGainer = createAsyncThunk('coins/getTopGainer', fetchTopGainer);
export const getTopLoser = createAsyncThunk('coins/getTopLoser', fetchTopLoser);

const coinSlice = createSlice({
  name: 'coins',
  initialState: {
    coinList: [],
    selectedCoin: '',
    days: 7,
    marketChart: null,
    topGainer: null,
    topLoser: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCoin: (state, action) => {
      state.selectedCoin = action.payload;
    },
    setDays: (state, action) => {
      state.days = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoinList.fulfilled, (state, action) => {
        state.coinList = action.payload;
      })
      .addCase(getMarketChart.fulfilled, (state, action) => {
        state.marketChart = action.payload;
      })
      .addCase(getTopGainer.fulfilled, (state, action) => {
        state.topGainer = action.payload;
      })
      .addCase(getTopLoser.fulfilled, (state, action) => {
        state.topLoser = action.payload;
      });
  },
});

export const { setSelectedCoin, setDays } = coinSlice.actions;
export default coinSlice.reducer;