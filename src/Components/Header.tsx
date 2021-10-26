import React from "react";
import { View, Text } from "react-native";
import { Appbar, Avatar, Button, Title } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { State } from "react-native-paper/lib/typescript/components/TextInput/types";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../state/action-creators";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Header = ({ page }: { page: string }) => {
  const navigation = useNavigation();
  const { balance, gameData, fetchedData, isLoggedIn, user } = useSelector(
    (state: State) => state.game
  );
  const [dataFetched, setDataFetched] = React.useState(false);
  const dispatch = useDispatch();
  const { logOut } = bindActionCreators(actionCreators, dispatch);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("gameData");
      if (value !== null) {
        const jsonValue = JSON.parse(value);
        // console.log(jsonValue);
        addData(jsonValue);
        console.log(gameData);
        setDataFetched(true);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  const logOutHandler = async () => {
    logOut(), await AsyncStorage.clear();
  };
  React.useEffect(() => {
    if (!fetchedData) {
    }
  }, [fetchedData]);
  return (
    <Appbar.Header dark={true}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 5,
        }}
      >
        <Title style={{ color: "#fff" }}>Abuzar Mirza</Title>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Button color="#fff">${balance.toFixed(2)}</Button>
          <Ionicons color="#fff" name="person" size={20} />
          {page === "login" ? (
            <Button
              color="#fff"
              onPress={() => {
                navigation.goBack();
              }}
            >
              Home
            </Button>
          ) : !isLoggedIn ? (
            <Button
              color="#fff"
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              Login
            </Button>
          ) : (
            <Button
              color="#fff"
              onPress={() => {
                logOutHandler();
              }}
            >
              LogOut
            </Button>
          )}
        
        </View>
      </View>
    </Appbar.Header>
  );
};

export default Header;
