import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListHolidaysScreen from "../../screens/rh/ListHolidays"
import DetailsHolidayScreen from "../../screens/rh/DetailsHoliday"

const HolidayStack = createStackNavigator();

const HolidayStackNavigation = () => {
  return (
    <HolidayStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"ListHoliday"} >
      <HolidayStack.Screen name='ListHoliday' component={ListHolidaysScreen} />
      <HolidayStack.Screen name='DetailsHoliday' component={DetailsHolidayScreen} />
    </HolidayStack.Navigator>
  );
};

export default HolidayStackNavigation;
