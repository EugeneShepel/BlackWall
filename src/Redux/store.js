import { configureStore } from '@reduxjs/toolkit';
import directionsReducer from './directions/directionsSlice';
import valletTypesReducer from './directions/valletTypesSlice';
import filterSliceReducer from './directions/filtersSlice';

const store = configureStore({
  reducer: {
    directions: directionsReducer,
    valletTypes: valletTypesReducer,
    filters: filterSliceReducer,
  },
});

export default store;
