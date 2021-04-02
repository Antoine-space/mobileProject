import React, {useContext} from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ActusScreen from '../screens/common/Actus';
import CalendarScreen from '../screens/salaries/Calendar';
import AccountScreen from '../screens/salaries/Account';
import HRTopBarNavigation from "./HR/HRTopBarNavigation"
import {AuthContext} from '../context/AuthContext'

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
  const {user} = useContext(AuthContext);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'lightgray',
      }}
    >
      <Tab.Screen
        name='Acceuil'
        component={ActusScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <IconWrapper focused={focused} color={color}>
              <Ionicons
                name='planet-outline'
                size={32}
                color={color}
              />
            </IconWrapper>
          ),
        }}
      />
      <Tab.Screen
        name='Calendrier'
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <IconWrapper focused={focused} color={color}>
              <Ionicons name='md-calendar' size={32} color={color} />
            </IconWrapper>
          ),
        }}
      />
      {user.salary.service.name === 'rh' ? (
        <Tab.Screen
          name='RH'
          component={HRTopBarNavigation}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <IconWrapper focused={focused} color={color}>
                <Ionicons
                  name="people-circle-outline"
                  size={32}
                  color={color}
                />
              </IconWrapper>
            ),
          }}
        />
      ) : null}
      <Tab.Screen
        name='Compte'
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
