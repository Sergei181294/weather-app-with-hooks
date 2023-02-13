import { createStore, combineReducers  } from "redux"
import { reducer as weatherReducer } from "./weather/reduser"
import { reducer as userReducer } from "./users/reducer"
import {composeWithDevTools} from 'redux-devtools-extension';


const reducer = combineReducers({
       weather: weatherReducer,
       user: userReducer,
     });

export const store = createStore(reducer, composeWithDevTools())

export type RootStore = ReturnType<typeof store.getState>