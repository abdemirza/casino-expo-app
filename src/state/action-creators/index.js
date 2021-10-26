import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { User } from "../reducers";

export const jackpot = (amount = 5) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.JACKPOT,
      payload: amount,
    });
  };
};
export const same = (amount= 2) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.SAME,
      payload: amount,
    });
  };
};
export const pair = (amount= 0.5) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.PAIR,
      payload: amount,
    });
  };
};

export const spin = (amount = -2) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.SPIN,
      payload: amount,
    });
  };
};

export const gameOverReducer = (gameOver= true) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.GAMEOVER,
      payload: gameOver,
    });
  };
};

export const debug = (credit= 5) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.DEBUG,
      payload: credit,
    });
  };
};
export const addData = (tableData) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.ADD_DATA,
      payload: tableData,
    });
  };
};

export const login = (user) => {
  return (dispatch => {
    dispatch({
      type: ActionType.LOGIN,
      payload: user,
    });
  });
};
export const addPrevBal = (balance)=>{
  return (dispatch => {
    dispatch({
      type: ActionType.ADD_PREV_BAL,
      payload: balance,
    });
  });
}
export const logOut = () => {
  return (dispatch) => {
    dispatch({
      type: ActionType.LOGOUT,
      payload: {},
    });
  };
};

export const addFromStore = (data,id) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.ADDFROMSTORE,
      payload: [data,id],
    });
  };
};
export const addInit = (data,id) => {
  return (dispatch) => {
    dispatch({
      type: ActionType.ADD_INIT,
      payload: {},
    });
  };
};

