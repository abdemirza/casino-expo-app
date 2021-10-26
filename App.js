import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppRegistry } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import App from "./src";
import AppNavContainer from "./src/navigator";
import { ACCENT, PRIMARY } from "./src/constants/colors";
import SlotMachine from "./src/Components/SlotMachine";
import { Provider, useDispatch } from "react-redux";
import { store } from "./src/state/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { bindActionCreators } from "redux";



export default function Main() {
 
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: PRIMARY,
      accent: ACCENT,
    },
  };
  
  return (
    <Provider store={store}>
      <AppNavContainer>
        <PaperProvider>
          <App />
        </PaperProvider>
      </AppNavContainer>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
