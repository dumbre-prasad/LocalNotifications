import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navServices';
import {createStackNavigator} from '@react-navigation/stack';
import VisitorListingScreen from '../screens/Visitor/visitorListingScreen/VisitorListingScreen';
import {VISITOR_LISTING_SCREEN, VISITOR_CREATE_SCREEN} from './navConstants';
import VisitorCreateScreen from '../screens/Visitor/VisitorCreateScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={VISITOR_LISTING_SCREEN}>
        <Stack.Screen
          name={VISITOR_LISTING_SCREEN}
          component={VisitorListingScreen}
          options={{
            title: 'Visitors',
          }}
        />
        <Stack.Screen
          name={VISITOR_CREATE_SCREEN}
          component={VisitorCreateScreen}
          options={{
            title: 'Add Visitor',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
