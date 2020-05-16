import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
console.disableYellowBox = true;
console.ignoredYellowBox = ['Animated: `useNativeDriver`'];

import BackgroundTask from 'react-native-background-task';

//This task run after every 16 mins when app is in background
BackgroundTask.define(() => {
  console.log('This app is running in background');
  PushNotification.cancelAllLocalNotifications();
  PushNotification.localNotificationSchedule({
    message: 'This app is running in background',
    date: new Date(Date.now() + 1 * 1000),
    ongoing: true,
    group: 'group',
    ignoreInForeground: true,
  });
  BackgroundTask.finish();
});
var PushNotification = require('react-native-push-notification');

const showLocalNotification = () => {
  PushNotification.cancelAllLocalNotifications();
  PushNotification.localNotificationSchedule({
    message: 'This app is running in background',
    date: new Date(Date.now() + 1 * 1000),
    ongoing: true,
    group: 'group',
    ignoreInForeground: true,
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
    BackgroundTask.schedule({
      period: 16 * 60, // Aim to run every 16 mins - Since 15min is max frquency
    });
  }, []);
  return <AppNavigator />;
};

export default App;
