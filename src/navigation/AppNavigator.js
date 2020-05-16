import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navServices';
import {createStackNavigator} from '@react-navigation/stack';
import VisitorListingScreen from '../screens/Visitor/VisitorListingScreen';
import {VISITOR_LISTING_SCREEN, NEWS_LISTING_SCREEN} from './navConstants';

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
          name={NEWS_LISTING_SCREEN}
          component={VisitorListingScreen}
          options={{
            title: 'Home',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
