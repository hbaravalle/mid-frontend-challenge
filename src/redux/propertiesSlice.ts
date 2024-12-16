import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Property } from '../types/property';

interface PropertiesState {
  list: Property[];
  searchResults: Property[];
  sort: string;
}

const initialState: PropertiesState = {
  list: [],
  searchResults: [],
  sort: 'date',
};

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async () => {
    const response = await fetch(
      'https://api-red-atlas-livid.vercel.app/api/properties'
    );
    if (!response.ok) {
      throw new Error('Error al obtener las propiedades');
    }
    const data = await response.json();
    return data.properties;
  }
);

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.list = action.payload;
    },
    addProperty: (state, action: PayloadAction<Property>) => {
      state.list.push(action.payload);
    },
    setSearchResults: (state, action: PayloadAction<Property[]>) => {
      state.searchResults = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { setProperties, addProperty, setSearchResults, setSort } =
  propertiesSlice.actions;
export default propertiesSlice.reducer;
