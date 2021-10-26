import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { DataTable } from "react-native-paper";
import { State } from "react-native-paper/lib/typescript/components/TextInput/types";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../state/action-creators";

const optionsPerPage = [2, 3, 4];

const ResultTable = () => {
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage);
  const [tableData, setTableData] = React.useState([]);
  const { balance, gameOver, gameData, fetchedData } = useSelector(
    (state) => state.game
  );
  const dispatch = useDispatch();
  const { addFromStore, addInit, login, same, addPrevBal } = bindActionCreators(
    actionCreators,
    dispatch
  );
  // AsyncStorage.clear();
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("gameData");
      let id = await AsyncStorage.getItem("id");
      let user = await AsyncStorage.getItem("user");
      let balance = await AsyncStorage.getItem("balance");

      const jsonValue = JSON.parse(value);
      if (!fetchedData && jsonValue) {
        addFromStore(jsonValue, parseInt(id));
        login(JSON.parse(user));
        let num = parseFloat(balance);
        addPrevBal(num);
      } else if (user) {
        login(JSON.parse(user));
      } else addInit();
      if (balance) {
        let num = parseFloat(balance);
        addPrevBal(num);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  React.useEffect(() => {
    getData();
    setPage(0);
  }, [fetchedData]);
  const rows = gameData.map((row) => {
    return (
      <DataTable.Row key={row.id}>
        <DataTable.Cell>{row.id}</DataTable.Cell>
        <DataTable.Cell numeric>{row.slotOne}</DataTable.Cell>
        <DataTable.Cell numeric>{row.slotTwo}</DataTable.Cell>
        <DataTable.Cell numeric>{row.slotThree}</DataTable.Cell>
        <DataTable.Cell numeric>{row.time}</DataTable.Cell>
      </DataTable.Row>
    );
  });
  return (
    <DataTable style={{ marginBottom: 120 }}>
      <DataTable.Header>
        <DataTable.Title>ID</DataTable.Title>
        <DataTable.Title numeric>Slot 1</DataTable.Title>
        <DataTable.Title numeric>Slot 2</DataTable.Title>
        <DataTable.Title numeric>Slot 3</DataTable.Title>
        <DataTable.Title numeric>Time</DataTable.Title>
      </DataTable.Header>

      {rows.map((row) => row)}

      <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={"Rows per page"}
      />
    </DataTable>
  );
};

export default ResultTable;
