import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
console.ignoredYellowBox = ['Animated: `useNativeDriver`'];
import {Platform} from 'react-native';
import BackgroundTask from 'react-native-background-task';

import Geolocation from 'react-native-geolocation-service';

if (Platform.OS === 'ios') {
  Geolocation.setRNConfiguration({
    authorizationLevel: 'whenInUse',
    skipPermissionRequests: false,
  });
}

const App = () => {
  return <AppNavigator />;
};

export default App;
