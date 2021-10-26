import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../state/action-creators";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { State } from "../state/reducers";
import asyncStorage from "@react-native-async-storage/async-storage";

const SlotMachine = ({ modalVisible, setModalVisible }) => {
  const arr: Array<any> = ["♠", "♥", "♦", "♣"];
  const [slotOne, setSlotOne] = useState("");
  const [slotTwo, setSlotTwo] = useState("");
  const [slotThree, setSlotThree] = useState("");
  const dispatch = useDispatch();
  const { jackpot, same, pair, spin, debug, gameOverReducer, addData } =
    bindActionCreators(actionCreators, dispatch);
  const { balance, gameOver, gameData, id, user } = useSelector(
    (state) => state.game
  );
  // asyncStorage.clear();
  const debugHandler = async () => {
   await  debug();
    await AsyncStorage.setItem("balance", `${balance+5}`);
  };
  const addToStorage = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("gameData", jsonValue);
      await AsyncStorage.setItem("id", `${id}`);
      await AsyncStorage.setItem("balance", `${balance}`);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  const addToTable = () => {
    const time = new Date().toLocaleTimeString();
    const tableData = { time, id: id, slotOne, slotTwo, slotThree };
    addData(tableData);
    // localStorage.setItem('gameData',JSON.stringify(gameData))
  };
  const randomFace = () => {
    const num = Math.floor(Math.random() * arr.length);
    return arr[num];
  };
  useEffect(() => {
    console.log(user);
    if (balance <= 0) {
      addToStorage(gameData);
      gameOverReducer();
    } else if (slotOne === "") {
    } else if (
      slotOne === slotTwo &&
      slotTwo === slotThree &&
      slotOne === arr[0]
    ) {
      addToTable();
      addToStorage(gameData);
      jackpot();
    } else if (slotOne === slotTwo && slotTwo === slotThree) {
      addToTable();
      addToStorage(gameData);
      same();
    } else if (
      slotOne === slotTwo ||
      slotOne === slotThree ||
      slotTwo === slotThree
    ) {
      addToTable();
      addToStorage(gameData);
      pair();
    } else {
      addToTable();
      addToStorage(gameData);
    }
  }, [slotOne, slotTwo, slotThree, gameOver]);
  const playHandler = () => {
    setSlotOne(randomFace);
    setSlotTwo(randomFace);
    setSlotThree(randomFace);
    spin();
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Press Spin to Begin!</Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-evenly",
              }}
            >
              <Text style={styles.modalText}>{slotOne}</Text>
              <Text style={styles.modalText}>{slotTwo}</Text>
              <Text style={styles.modalText}>{slotThree}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                disabled={gameOver}
                mode="contained"
                onPress={() => playHandler()}
              >
                Spin
              </Button>
              <Button
                mode="contained"
                //   color="secondary"
                onPress={() => debugHandler()}
                style={{ backgroundColor: "green" }}
              >
                Debug
              </Button>

              <Button
                mode="contained"
                style={{ backgroundColor: "red" }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                Close
              </Button>
            </View>
            <Text style={{ marginTop: 15, color: "grey" }}>
              Note: Each Spin Costs $2
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: "50%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    // elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 45,
    textAlign: "center",
  },
});

export default SlotMachine;
