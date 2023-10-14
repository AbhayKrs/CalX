import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNavigationContainerRef } from "@react-navigation/native";

// import StackNav from './src/components/StackNav';
import NavRoot from './src/components/NavRoot';

export const navigationRef = createNavigationContainerRef();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <NavRoot navref={navigationRef} />
    </NavigationContainer>
  );
}

export default App;
