import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomBarNav from './BottomBarNavigation';
import AuthStackNavigation from './auth/AuthStackNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';

function RootNavigation() {
  const { user } = useContext(AuthContext);
  return (
    
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        {user.token ? <BottomBarNav /> : <AuthStackNavigation />}
      </SafeAreaView>
    </NavigationContainer>
    
  );
}

export default RootNavigation;
