/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const defaultTypes = {
  data: [
    {
      Все: ['ACRUB', 'SBERRUB', 'TCSBRUB', 'BTC', 'ETH', 'USDTTRC', 'CASHUSD', 'CASHRUB'],
    },
    {
      'Банки RUB': ['ACRUB', 'SBERRUB', 'TCSBRUB'],
    },
    {
      Криптовалюты: ['BTC', 'ETH', 'USDTTRC'],
    },
    {
      Наличные: ['CASHUSD', 'CASHRUB'],
    },
  ],
};

export const valletTypesSlice = createSlice({
  name: 'valletTypes',
  initialState: defaultTypes,
  reducers: {
    allValletTypes: (state) => state,
    resetState: () => defaultTypes,
    typeFilter:
      (state, action) => {
        state.data = state.data.filter((el) => (Object.keys(el))[0] === action.payload.from);
      },
  },
});

export const { allValletTypes, typeFilter, resetState } = valletTypesSlice.actions;

export default valletTypesSlice.reducer;
