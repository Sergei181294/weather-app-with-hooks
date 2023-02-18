import { configureStore } from "@reduxjs/toolkit";
import { createStore, combineReducers, applyMiddleware } from "redux"
import { reducer as weatherReducer } from "./weather/reduser"
import { reducer as userReducer } from "./users/reducer"
// import { composeWithDevTools } from 'redux-devtools-extension';
// import Thunk from "redux-thunk"


const reducer = combineReducers({
  weather: weatherReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: reducer
})

// export const store = createStore(reducer, composeWithDevTools(applyMiddleware(Thunk)))

export type RootStore = ReturnType<typeof store.getState>