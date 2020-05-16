import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
console.disableYellowBox = true;
console.ignoredYellowBox = ['Animated: `useNativeDriver`'];

import BackgroundTask from 'react-native-background-task';
BackgroundTask.define(() => {
  console.log('ADITI');
  BackgroundTask.finish();
});

const App = () => {
  useEffect(() => {
    BackgroundTask.schedule();
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
