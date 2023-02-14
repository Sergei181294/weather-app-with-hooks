import { LOAD_STATUSES_TYPES, WeatherStore, Action } from "../../types";




const initialStore: WeatherStore = {
       loadStatus: LOAD_STATUSES_TYPES.SET_UNKNOWN,
       weather: {
              main: { temp: 0, humidity: 0, feels_like: 0, pressure: 0 },
              wind: { speed: 0 },
              id: 0,
              weather: [{ icon: "04n" }],
       }
}


export const reducer = (store: WeatherStore = initialStore, action: Action): WeatherStore => {
       switch (action.type) {
              case (LOAD_STATUSES_TYPES.SET_LOADING):
                     return { loadStatus: "weather/loading", weather: initialStore.weather }
              case (LOAD_STATUSES_TYPES.SET_ERROR):
                     return { loadStatus: "weather/error", weather: initialStore.weather }
              case (LOAD_STATUSES_TYPES.SET_LOADED):
                     return { loadStatus: "weather/loaded", weather: action.payload }
              default: { return store }
       }
}
