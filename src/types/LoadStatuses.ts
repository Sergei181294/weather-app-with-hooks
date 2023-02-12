export interface Weather {
       main: { 
         temp: number; 
         feels_like: number;
         humidity:number;
         pressure: number;
       };
       wind: { speed: number };
       id?: number;
       weather: {icon: string}[];
     }

export enum LOAD_STATUSES_TYPES {
       SET_LOADING = "loading",
       SET_ERROR = "error",
       SET_LOADED = "loaded",
       SET_UNKNOWN = "unknown"
}

export interface Store {
       loadStatus: string;
       weather: Weather;
}

export type SET_WEATHER_ACTION = {type: LOAD_STATUSES_TYPES.SET_LOADED, payload: Weather }
export type SET_LOADING = {type: LOAD_STATUSES_TYPES.SET_LOADING }
export type SET_ERROR = {type: LOAD_STATUSES_TYPES.SET_ERROR }
export type SET_UNKNOWN = {type: LOAD_STATUSES_TYPES.SET_UNKNOWN }

export type Action = SET_WEATHER_ACTION | SET_ERROR | SET_LOADING | SET_UNKNOWN