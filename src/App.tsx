import { useState, useEffect, useCallback, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Input, Info, Dropdawn, Loader } from "./components/common"
import { Weather, Units, UnitsLabel } from "./types"
import { getDate, getDay, getTime } from "./utils"

import { getUserStatus } from "./store/users/selectors"
import { getLoadStatus, getWeatherFromStore } from "./store/weather/selectors"
import { setError, setLoaded, setLoading } from "./store/weather/actionCreators"
import { logIn } from "./store/users/actionCreators"

import css from "./app.module.css"
import humIcon from "./img/humidity-icon.svg"
import pressureIcon from "./img/pressure.svg"
import windIcon from "./img/wind-icon.svg"
import debounce from 'lodash/debounce';


export enum LOAD_STATUSES {
    LOADING = "LOADING",
    ERROR = "ERROR",
    LOADED = "LOADED",
    UNKNOWN = "UNKNOWN"
}

const myFetch = (url: string) => {
    return fetch(url).then((data) => {
        if (data.ok) {
            return data.json();
        }
        throw Error("oops");
    });
};

export const App = () => {

    const [searchCity, setSearchCity] = useState("Minsk")
    const [unit, setUnit] = useState<Units>("metric")
    const [inputValue, setInputValue] = useState("")

    const loadStatus = useSelector(getLoadStatus)
    const weather = useSelector(getWeatherFromStore)
    const isAuth = useSelector(getUserStatus)
    const dispatch = useDispatch()


    const getWeather = (searchCity: string, unit: Units) => {
        dispatch(setLoading())
        myFetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=a7e03ffabe5b1e62a91464877799652d&units=${unit}`)
            .then((weather) => dispatch(setLoaded(weather)))
            // .then(() => { setLoadStatus(LOAD_STATUSES.LOADED) })
            .catch(() => dispatch(setError()))
    }


    const getWeatherDebounce = useCallback(debounce(getWeather, 1500), [])


    const dropdawnOptions = [
        { value: 'metric', label: 'Metric, °C' },
        { value: 'imperial', label: 'Imperial, °F' },
        { value: 'standard', label: 'Standard, K' }
    ]

    const isOffline = true

    useEffect(() => {
        if (isOffline) {
            return
        }
        getWeatherDebounce(searchCity, unit)
    }, [searchCity, unit])


    const infoItems: { icon?: any; label: string; key: string; unit: UnitsLabel }[] = [
        {
            icon: humIcon,
            label: "Humidity",
            key: 'humidity',
            unit: {
                metric: ' %',
                imperial: " %",
                standard: " %"
            }
        },
        {
            icon: pressureIcon,
            label: "Pressure",
            key: 'pressure',
            unit: {
                metric: ' gPa',
                imperial: " gPa",
                standard: " gPa"
            }
        },
        {
            icon: windIcon,
            label: "Wind",
            key: 'speed',
            unit: {
                metric: ' m/s',
                imperial: " miles/hour",
                standard: " m/s"
            }
        },
    ];
    const unitLabels = {
        metric: "°C",
        imperial: "°F",
        standard: "K",
    }


    return (
        <div>
            {isAuth ?
                <div>
                    <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <button onClick={() => dispatch(logIn(inputValue))} >Log in</button>
                </div> :


                <div className={css.main}>
                    <Loader isLoading={loadStatus === LOAD_STATUSES.LOADING} />
                    {loadStatus === LOAD_STATUSES.ERROR && (<span>Что-то пошло не так...</span>)}
                    <div className={css.container_left}>
                        <div className={css.logo}>
                            <img className={css.weatherIcon} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon' />
                        </div>
                        <div className={css.infoWeather}>
                            <p className={css.temperature}>
                                {Math.round(weather.main.temp)} {unitLabels[unit]}
                            </p>
                            <span className={css.temp_feel}>
                                feels like {Math.round(weather.main.feels_like)} {unitLabels[unit]}
                            </span>
                            <p className={css.date}>{getDate()}</p>
                            <p className={css.day}>{getDay()} {getTime()}</p>
                            <ul className={css.list}>
                                {infoItems.map((item) => (
                                    <Info
                                        key={item.key}
                                        icon={item.icon}
                                        label={item.label}
                                        value={weather?.main[item.key as keyof Weather['main']] || weather.wind.speed}
                                        unit={item.unit[unit]}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={css.container_right}>
                        <Input value={searchCity} onChange={(e) => setSearchCity(e.target.value)} />
                        <Dropdawn value={unit} units={dropdawnOptions} onChange={(e) => setUnit(e.target.value)} />

                    </div>
                </div>}
        </div>
    )
}
