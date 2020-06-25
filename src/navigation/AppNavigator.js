import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navServices';
import {createStackNavigator} from '@react-navigation/stack';
import ScheduleNotificationScreen from '../screens/ScheduleNotificationScreen';
import {SCHEDULE_NOTIFICATION_SCREEN, NOTIFICATION_STACK} from './navConstants';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Icon, Text} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';

function TestScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>TestScreen!</Text>
    </View>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const NotificationStack = () => {
  return (
    <Stack.Navigator initialRouteName={SCHEDULE_NOTIFICATION_SCREEN}>
      <Stack.Screen
        name={SCHEDULE_NOTIFICATION_SCREEN}
        component={ScheduleNotificationScreen}
        options={({navigation}) => ({
          title: 'Schedule Notifications',
          headerLeft: () => (
            <Icon
              onPress={() => navigation.openDrawer()}
              type="MaterialCommunityIcons"
              name="menu"
              style={{marginLeft: 10, fontSize: 36}}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Notifications">
      <Tab.Screen name="Notifications" component={NotificationStack} />
      <Tab.Screen name="Other" component={TestScreen} />
    </Tab.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator initialRouteName={NOTIFICATION_STACK}>
        <Drawer.Screen name={NOTIFICATION_STACK} component={TabNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
