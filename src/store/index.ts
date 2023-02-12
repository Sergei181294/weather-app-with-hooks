import { createStore } from "redux"
import { reducer } from "./reduser"

export const store = createStore(reducer)