import {StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/Navigation';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <Navigation />
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
