import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AccountStack from "./AccountStackNavigation"
import HolidayStack from "./HolidaysStackNavigation"
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

function TopBarNav() {
  return (
    <SafeAreaView  style={{flex: 1}}  >
    <Tab.Navigator>
      <Tab.Screen name="Account" component={AccountStack} />
      <Tab.Screen name="Holidays" component={HolidayStack} />
    </Tab.Navigator>
    </SafeAreaView>
  );
}

export default TopBarNav