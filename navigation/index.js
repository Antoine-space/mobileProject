import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomBarNav from './BottomBarNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';

function RootNavigation() {
  return (
    
    <NavigationContainer>
      <SafeAreaView style={{flex:1 }}>
        <BottomBarNav />
      </SafeAreaView>
    </NavigationContainer>
    
  );
}

export default RootNavigation;
