import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navServices';
import {createStackNavigator} from '@react-navigation/stack';
import VisitorListingScreen from '../screens/Visitor/visitorListingScreen/VisitorListingScreen';
import {
  VISITOR_LISTING_SCREEN,
  VISITOR_CREATE_SCREEN,
  VISITOR_STACK,
  NEWS_LISTING_SCREEN,
  NEWS_STACK,
} from './navConstants';
import VisitorCreateScreen from '../screens/Visitor/VisitorCreateScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import NewsListingScreen from '../screens/News/NewsListingScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const VisitorStack = () => {
  return (
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
  );
};

const NewsrStack = () => {
  return (
    <Stack.Navigator initialRouteName={VISITOR_LISTING_SCREEN}>
      <Stack.Screen
        name={NEWS_LISTING_SCREEN}
        component={NewsListingScreen}
        options={{
          title: 'Latest News',
        }}
      />
    </Stack.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator initialRouteName={NEWS_STACK}>
        <Drawer.Screen name={VISITOR_STACK} component={VisitorStack} />
        <Drawer.Screen name={NEWS_STACK} component={NewsrStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
