// import { WeatherStore } from "../../types";
import type { RootStore } from "..";

export const getLoadStatus = (store: RootStore) => store.weather.loadStatus;


export const getWeatherFromStore = (store: RootStore) => store.weather.weather;