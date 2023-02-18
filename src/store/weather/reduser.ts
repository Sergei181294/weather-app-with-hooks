import { LOAD_STATUSES_TYPES, WeatherStore, Action } from "../../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWeather } from "../../api";


const SLICE_NAME = "weather";

const weatherOnBack = createAsyncThunk(SLICE_NAME, getWeather)

const initialState: WeatherStore = {
       loadStatus: LOAD_STATUSES_TYPES.SET_UNKNOWN,
       weather: {
              main: { temp: 0, humidity: 0, feels_like: 0, pressure: 0 },
              wind: { speed: 0 },
              id: 0,
              weather: [{ icon: "04n" }],
       }
}

const { reducer, actions } = createSlice({
       name: SLICE_NAME,
       initialState,
       reducers: {},
       extraReducers: (builder) => {
              builder.addCase(weatherOnBack.pending, (state, action) => {
                     state.loadStatus = LOAD_STATUSES_TYPES.SET_LOADING;
              });
              builder.addCase(weatherOnBack.rejected, (state, action) => {
                     state.loadStatus = LOAD_STATUSES_TYPES.SET_ERROR;
              });
              builder.addCase(weatherOnBack.fulfilled, (state, action) => {    
                     state.weather = action.payload;
                     state.loadStatus =  LOAD_STATUSES_TYPES.SET_LOADED;
              })
       }
})
export { reducer }
export const actionsWeather = { weatherOnBack }

// export const reducer = (store: WeatherStore = initialStore, action: Action): WeatherStore => {
//        switch (action.type) {
//               case (LOAD_STATUSES_TYPES.SET_LOADING):
//                      return { loadStatus: "weather/loading", weather: initialStore.weather }
//               case (LOAD_STATUSES_TYPES.SET_ERROR):
//                      return { loadStatus: "weather/error", weather: initialStore.weather }
//               case (LOAD_STATUSES_TYPES.SET_LOADED):
//                      return { loadStatus: "weather/loaded", weather: action.payload }
//               default: { return store }
//        }
// }
