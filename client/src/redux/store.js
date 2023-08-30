import { createStore } from "redux";
import FoodReducer from "./reducer";

const store = createStore(FoodReducer);

export default store;
