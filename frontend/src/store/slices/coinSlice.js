import { createSlice } from "@reduxjs/toolkit";

const coinSlice = createSlice({
  name : "coins",
  initialState : {
    selectedCoin : "",
    selectedDays : 7,
    coinList : []
  },
  reducers : {
    setSelectedCoin : (state, action) => {
      state.selectedCoin = action.payload;
    },
    setSelectedDays : (state, action) => {
      state.selectedDays = action.payload;
    },
    setCoinList : (state, action) => {
      state.coinList = action.payload;
    }
  },
});

export const {setSelectedCoin, setSelectedDays, setCoinList} = coinSlice.actions;
export default coinSlice.reducer;