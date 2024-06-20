import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './App/Router/AppNavigator';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppNavigator />
  );
};

export default App;
