import React, { useState } from "react";
import { View, Text,ScrollView } from "react-native";
import { Button, Dialog } from "react-native-paper";
import Header from "../../Components/Header";
import ResultTable from "../../Components/ResultTable";
import SlotMachine from "../../Components/SlotMachine";

const HomeScreen = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const hideDialog = () => setVisible(false);
  
  return (
    <View>
      <Header />
    <ScrollView>
      <View
        style={{
          alignItems: "center",
          marginTop: `${!modalVisible ?"10%":"20%"}`,
        }}
      >
        {!modalVisible && <Button
          mode="contained"
          onPress={() => {
            setModalVisible(!modalVisible)
          }}
          >
          Start the Game
        </Button>}
          <ResultTable />
      </View>
       <SlotMachine modalVisible={modalVisible} setModalVisible={setModalVisible} />
       </ScrollView>
    </View>
  );
};

export default HomeScreen;
