import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListAccountScreen from "../../screens/rh/ListAccount"
import DetailsAccountScreen from "../../screens/rh/DetailsAccount"

const AccountStack = createStackNavigator();

const AccountStackNavigation = () => {
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"ListAccount"} >
      <AccountStack.Screen name='ListAccount' component={ListAccountScreen} />
      <AccountStack.Screen name='DetailsAccount' component={DetailsAccountScreen} />
    </AccountStack.Navigator>
  );
};

export default AccountStackNavigation;
