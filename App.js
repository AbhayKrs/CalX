import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNavigationContainerRef } from "@react-navigation/native";


// import StackNav from './src/components/StackNav';
import NavRoot from './src/components/NavRoot';
import json_data from './src/utils/workouts.json';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const navigationRef = createNavigationContainerRef();

const App = () => {
  useEffect(() => {
    (async function () {
      AsyncStorage.clear();
      let workouts_data = await AsyncStorage.getItem('workouts');
      if (!workouts_data)
        AsyncStorage.setItem('workouts', JSON.stringify(json_data.workouts));
    })();
  }, [])

  return (
    <NavigationContainer ref={navigationRef}>
      <NavRoot navref={navigationRef} />
    </NavigationContainer>
  );
}

export default App;
