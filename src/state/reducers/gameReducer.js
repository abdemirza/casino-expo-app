import { ActionType } from "../action-types";

const initialState = {
  balance: 9.99,
  gameOver: false,
  gameData: [],
  user: {},
  id: 0,
  isLoggedIn: false,
  fetchedData: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return { ...state, user: action.payload, isLoggedIn: true };
    case ActionType.LOGOUT:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
        gameData: [],
        balance: 9.99,
      };
    case ActionType.JACKPOT:
    case ActionType.SAME:
    case ActionType.PAIR:
      return { ...state, balance: action.payload + state.balance };
    case ActionType.SPIN:
      return { ...state, balance: state.balance - 2 };
    case ActionType.DEBUG:
      return { ...state, balance: state.balance + 5, gameOver: false };
    case ActionType.ADD_DATA:
      return {
        ...state,
        gameData: [...state.gameData, action.payload],
        id: state.id + 1,
      };
    case ActionType.GAMEOVER:
      return { ...state, balance: 0, gameOver: true };
    case ActionType.ADDFROMSTORE:
      return {
        ...state,
        gameData: [...state.gameData, ...action.payload[0]],
        fetchedData: true,
        id: action.payload[1],
      };
    case ActionType.ADD_INIT:
      return { ...state, fetchedData: true };
    case ActionType.ADD_PREV_BAL:
      return { ...state, fetchedData: true ,balance:action.payload};
    default:
      return state;
  }
};

export default reducer;
