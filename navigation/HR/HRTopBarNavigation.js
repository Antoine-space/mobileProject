import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AccountStack from "./AccountStackNavigation"
import HolidayStack from "./HolidaysStackNavigation"

const Tab = createMaterialTopTabNavigator();

function TopBarNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Account" component={AccountStack} />
      <Tab.Screen name="Holidays" component={HolidayStack} />
    </Tab.Navigator>
  );
}

export default TopBarNav