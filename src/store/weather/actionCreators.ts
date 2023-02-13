import { LOAD_STATUSES_TYPES, Weather, SET_WEATHER_ACTION } from "../../types";


export const setError = () => ({
       type: LOAD_STATUSES_TYPES.SET_ERROR
});
export const setLoaded = (weather: Weather): SET_WEATHER_ACTION => ({
       type: LOAD_STATUSES_TYPES.SET_LOADED,
       payload: weather,
});
export const setLoading = () => ({
       type: LOAD_STATUSES_TYPES.SET_LOADING
});
