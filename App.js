import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './App/Router/AppNavigator';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './App/Redux/Reducers/index.js';
import { loadFavorites } from './App/Redux/Reducers/Favorites.js';
// import NotificationService from './App/Utility/NotificationService.js';

const store = configureStore({
  reducer: rootReducer
});

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
    store.dispatch(loadFavorites());
    // NotificationService.configure();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
