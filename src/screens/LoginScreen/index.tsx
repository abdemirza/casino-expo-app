import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../../Components/Header";
import * as actionCreators from "../../state/action-creators";

const LoginScreen = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {login } =
  bindActionCreators(actionCreators, dispatch);
  const loginHandler = async()=>{
      login({username,password,email})
      await AsyncStorage.setItem('user',JSON.stringify({username,password,email}))
      navigation.navigate('Home')
  }
  const {user,isLoggedIn } = useSelector(
    (state) => state.game
  );
  return (
    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <Header page={'login'}  />
      <View
        style={{
          marginTop: "30%",
          padding: "5%",
        //   height: "60%",
          justifyContent: "space-evenly",
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Login Screen</Text>
        <TextInput
          label="Username"
          onChangeText={(e) => setUsername(e)}
          value={username}
          mode="outlined"
        />
        <TextInput
          label="Email"
          onChangeText={(e) => setEmail(e)}
          value={email}
          mode="outlined"
        />
        <TextInput
          label="Password"
          onChangeText={(e) => setPassword(e)}
          value={password}
          secureTextEntry={true}
          mode="outlined"
        />
        <View style={{justifyContent: "space-evenly",height: "35%"}}>
          <Button disabled={username=='' ||email==''||password==''?true:false} onPress={()=>loginHandler()} mode="contained">Login</Button>
          <Text style={{textAlign: "center", fontSize:20}}>OR</Text>
          <Button color="red" onPress={()=>navigation.navigate('Home')}>Play as Guest</Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
