import { LOAD_STATUSES_TYPES, Store, Action } from "../types";




const initialStore: Store = {
       loadStatus: LOAD_STATUSES_TYPES.SET_UNKNOWN,
       weather: {
              main: { temp: 0, humidity: 0, feels_like: 0, pressure: 0 },
              wind: { speed: 0 },
              id: 0,
              weather: [{ icon: "04n" }],
       }
}


export const reducer = (store: Store = initialStore, action: Action): Store => {
       switch (action.type) {
              case (LOAD_STATUSES_TYPES.SET_LOADING):
                     return { loadStatus: "loading", weather: initialStore.weather }
              case (LOAD_STATUSES_TYPES.SET_ERROR):
                     return { loadStatus: "error", weather: initialStore.weather }
              case (LOAD_STATUSES_TYPES.SET_LOADED):
                     return { loadStatus: "loaded", weather: action.payload }
              case (LOAD_STATUSES_TYPES.SET_UNKNOWN):
                     return { loadStatus: "unknown", weather: initialStore.weather }
              default: { return store }
       }
}

export const getLoadStatus = (store: Store) => store.loadStatus;
export const getWeatherFromStore = (store: Store) => store.weather;