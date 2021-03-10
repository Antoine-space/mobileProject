import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../../screens/auth/Login"
import ForgotScreen from "../../screens/auth/Forgot"

const AuthStack = createStackNavigator();

const AuthStackNavigation = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Login"} >
      <AuthStack.Screen name='Login' component={LoginScreen} />
      <AuthStack.Screen name='Forgot' component={ForgotScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigation;
