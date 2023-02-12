import { LOAD_STATUSES_TYPES, Weather, SET_WEATHER_ACTION } from "../types";


export const set_error = () => ({
       type: LOAD_STATUSES_TYPES.SET_ERROR
});
export const set_loaded = (weather: Weather): SET_WEATHER_ACTION => ({
       type: LOAD_STATUSES_TYPES.SET_LOADED,
       payload: weather,
});
export const set_loading = () => ({
       type: LOAD_STATUSES_TYPES.SET_LOADING
});
export const set_unknown = () => ({
       type: LOAD_STATUSES_TYPES.SET_UNKNOWN
});