import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from "./HomeNavigation";

const AppNavContainer = () => {
  return (
    <>
      <NavigationContainer>
          <HomeNavigator />
      </NavigationContainer>
    </>
  );
};

export default AppNavContainer;
