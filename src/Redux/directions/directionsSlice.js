import { createSlice } from '@reduxjs/toolkit';

const defaultDirections = [
  {
    code: 'BTC',
    name: 'Bitcoin BTC ',
  },
  {
    code: 'ETH',
    name: 'Ethereum ETH ',
  },
  {
    code: 'CASHUSD',
    name: 'Наличные USD ',
  },
  {
    code: 'CASHRUB',
    name: 'Наличные RUB ',
  },
  {
    code: 'ACRUB',
    name: 'Альфа-банк RUB ',
  },
  {
    code: 'SBERRUB',
    name: 'Сбербанк RUB ',
  },
  {
    code: 'TCSBRUB',
    name: 'Тинькофф RUB ',
  },
  {
    code: 'USDTTRC',
    name: 'Tether TRC20 USDT ',
  },
];

export const directionsSlice = createSlice({
  name: 'directions',
  initialState: defaultDirections,
  reducers: {
    allDirections: (state) => state,
  },
});

export const { allDirections } = directionsSlice.actions;

export default directionsSlice.reducer;
