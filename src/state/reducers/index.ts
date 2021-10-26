import { combineReducers } from "redux";
import gameReducer from "./gameReducer";

const reducers = combineReducers({
  game: gameReducer,
});

export default reducers;
export type gameData = {
  id: string;
  slotOne: string;
  slotTwo: string;
  slotThree: string;
  time: string;
};
export type User = { 
    username:string;
    email :string;
    password : string;
}
export type Game = {
  balance: number;
  gameOver: boolean;
  gameData: Array<gameData>;
  id: number;
  user: User;
  fetchedData:false;
  isLoggedIn:boolean;
};
export type State = {
  game: Game;
};
