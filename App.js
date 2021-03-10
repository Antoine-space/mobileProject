import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from './navigation';
import AuthContextProvier from './context/AuthContext'

function App() {
  return (
    <AuthContextProvier>
      <SafeAreaProvider>
        <RootNavigation />
      </SafeAreaProvider>
    </AuthContextProvier>
  );
}

export default App;
