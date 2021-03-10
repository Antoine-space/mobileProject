import * as React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ActusScreen from '../screens/common/Actus';
import CalendarScreen from '../screens/salaries/Calendar';
import AccountScreen from '../screens/salaries/Account';
import HRTopBarNavigation from "./HR/HRTopBarNavigation"

const Tab = createBottomTabNavigator();

const IconWrapper = ({ color, children, focused }) => {
  return (
    <>
      <View
        style={{
          borderTopColor: color,
          borderTopWidth: focused ? 2 : 0,
          borderStyle: 'solid',
          width: 50,
          position: 'absolute',
          top: -2,
        }}
      />
      {children}
    </>
  );
};

function BottomBarNav() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'lightgray',
      }}
    >
      <Tab.Screen
        name='Home'
        component={ActusScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <IconWrapper focused={focused} color={color}>
              <Ionicons
                name='md-home'
                size={32}
                color={color}
              />
            </IconWrapper>
          ),
        }}
      />
      <Tab.Screen
        name='Calendar'
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <IconWrapper focused={focused} color={color}>
              <Ionicons name='md-calendar' size={32} color={color} />
            </IconWrapper>
          ),
        }}
      />
      {user.service === 'rh' ? (
        <Tab.Screen
          name='HR'
          component={HRTopBarNavigation}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <IconWrapper focused={focused} color={color}>
                <Ionicons
                  name='ios-globe'
                  size={32}
                  color={color}
                />
              </IconWrapper>
            ),
          }}
        />
      ) : null}
      <Tab.Screen
        name='Account'
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <IconWrapper focused={focused} color={color}>
              <Ionicons name='md-settings' size={32} color={color} />
            </IconWrapper>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomBarNav;
