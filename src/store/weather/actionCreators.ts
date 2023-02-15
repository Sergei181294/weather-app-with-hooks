import { Dispatch } from "redux"
import { LOAD_STATUSES_TYPES, Weather, SET_WEATHER_ACTION } from "../../types";
import { getWeather } from "../../api";


const setError = () => ({
       type: LOAD_STATUSES_TYPES.SET_ERROR
});
const setLoaded = (weather: Weather): SET_WEATHER_ACTION => ({
       type: LOAD_STATUSES_TYPES.SET_LOADED,
       payload: weather,
});
const setLoading = () => ({
       type: LOAD_STATUSES_TYPES.SET_LOADING
});

export const fetchWeather = (params: { q: string; units: string }) => (dispatch: Dispatch) => {
       dispatch(setLoading());
     
       getWeather(params)
         .then((weather) => {
           dispatch(setLoaded(weather));
         })
         .catch(() => {
           dispatch(setError());
         });
     };
