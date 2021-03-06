import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Points from '../pages/Points';
import Detail from '../pages/Detail';

const AppSatack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppSatack.Navigator
        headerMode="none"
        screenOptions={
          {
            cardStyle: {
              backgroundColor: "#f0f0f5",
            }
          }
        }
      >
        <AppSatack.Screen name="Home" component={Home} />
        <AppSatack.Screen name="Points" component={Points} />
        <AppSatack.Screen name="Detail" component={Detail} />
      </AppSatack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
