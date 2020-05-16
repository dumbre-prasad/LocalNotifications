import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
console.disableYellowBox = true;
console.ignoredYellowBox = ['Animated: `useNativeDriver`'];

// import BackgroundTask from 'react-native-background-task';
// BackgroundTask.define(() => {
//   console.log('This app is running in background');
//   showLocalNotification();
//   BackgroundTask.finish();
// });
var PushNotification = require('react-native-push-notification');

const showLocalNotification = () => {
  PushNotification.localNotificationSchedule({
    message: 'This app is running in background',
    date: new Date(Date.now() + 1 * 1000),
    ongoing: true,
    // repeatType: 'time',
    // repeatTime: 1000,
    // vibrate: false,
    // playSound: false,
    // soundName: 'none',
  });
};

const App = () => {
  useEffect(() => {
    showLocalNotification();
    // BackgroundTask.schedule();
  }, []);
  return <AppNavigator />;
};

export default App;

//TODO: Eject FAB in  component
//TODO: Eject DateTimePicker in separate component
//TODO: Eject Picker in  separate component
//TODO: Sort Visitors list by time
//TODO: Shrink Text in card
//TODO: Handle LAndscape

// Good Cofing practise
// Cleen code
// optimised components
// Project structure
