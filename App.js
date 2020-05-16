import React from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
console.disableYellowBox = true;
console.ignoredYellowBox = ['Animated: `useNativeDriver`'];
const App = () => <AppNavigator />;

export default App;

//TODO: Eject FAB in  component
//TODO: Eject DateTimePicker in separate component
//TODO: Eject Picker in  separate component
