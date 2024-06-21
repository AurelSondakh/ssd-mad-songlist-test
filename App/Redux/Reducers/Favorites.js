// favoritesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationService from '../../Utility/NotificationService';

export const loadFavorites = createAsyncThunk('favorites/loadFavorites', async () => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites from AsyncStorage:', error);
    return []; // Return empty array if there's an error
  }
});

export const toggleFavorite = createAsyncThunk('favorites/toggleFavorite', async (music, { getState }) => {
  let favorites = getState().favorites.slice(); // Clone the array
  const index = favorites.findIndex((fav) => fav.trackId === music.trackId);
  let notificationMessage = '';

  if (index >= 0) {
    favorites.splice(index, 1);
    notificationMessage = `Successfully removed '${music.trackName}' from favorites`;
  } else {
    favorites.push(music);
    notificationMessage = `Successfully added '${music.trackName}' to favorites`;
  }

  try {
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    NotificationService(
      music.trackName,
      notificationMessage,
      music.artworkUrl100
    );
    return favorites;
  } catch (error) {
    console.error('Error storing favorites in AsyncStorage:', error);
    throw error; // Propagate the error
  }
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.fulfilled, (state, action) => action.payload)
      .addCase(toggleFavorite.fulfilled, (state, action) => action.payload);
  },
});

export default favoritesSlice.reducer;
