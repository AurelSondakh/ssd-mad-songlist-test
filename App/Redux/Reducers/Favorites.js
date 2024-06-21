import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadFavorites = createAsyncThunk('favorites/loadFavorites', async () => {
  const favorites = await AsyncStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
});

export const toggleFavorite = createAsyncThunk('favorites/toggleFavorite', async (music, { getState }) => {
  const state = getState();
  let favorites = [...state.favorites];
  const index = favorites.findIndex(fav => fav.trackId === music.trackId);

  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push(music);
  }

  await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  return favorites;
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export default favoritesSlice.reducer;
