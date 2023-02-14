export enum LOAD_STATUSES {
       LOADING = "LOADING",
       ERROR = "ERROR",
       LOADED = "LOADED",
       UNKNOWN = "UNKNOWN"
}

export type ALL_STATUSES = LOAD_STATUSES.LOADING | LOAD_STATUSES.ERROR | LOAD_STATUSES.LOADED | LOAD_STATUSES.UNKNOWN


export interface Weather {
       main: {
              temp: number;
              feels_like: number;
              humidity: number;
              pressure: number;
       };
       wind: { speed: number };
       id?: number;
       weather: { icon: string }[];
}

export enum LOAD_STATUSES_TYPES {
       SET_LOADING = "weather/loading",
       SET_ERROR = "weather/error",
       SET_LOADED = "weather/loaded",
       SET_UNKNOWN = "weather/unknown"
}



export interface WeatherStore {
       loadStatus: string;
       weather: Weather;
}

export type SET_WEATHER_ACTION = { type: LOAD_STATUSES_TYPES.SET_LOADED, payload: Weather }
export type SET_LOADING = { type: LOAD_STATUSES_TYPES.SET_LOADING }
export type SET_ERROR = { type: LOAD_STATUSES_TYPES.SET_ERROR }


export type Action = SET_WEATHER_ACTION | SET_ERROR | SET_LOADING 