import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomBarNav from './BottomBarNavigation';

function RootNavigation() {
  return (
    <NavigationContainer>
      <BottomBarNav />
    </NavigationContainer>
  );
}

export default RootNavigation;
