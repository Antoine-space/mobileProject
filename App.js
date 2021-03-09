import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from './navigation';

function App() {
  return (
    <SafeAreaProvider>
      <RootNavigation />
    </SafeAreaProvider>
  );
}

export default App;
