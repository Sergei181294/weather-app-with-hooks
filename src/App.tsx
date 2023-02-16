import { useState, useEffect, useCallback } from "react"

import { useSelector, useDispatch } from "react-redux"
import { Input, Info, Dropdawn, Loader } from "./components/common"
import { Weather, UnitsLabel } from "./types"
import { getDate, getDay, getTime } from "./utils"

import { getUserStatus } from "./store/users/selectors"
import { getLoadStatus, getWeatherFromStore } from "./store/weather/selectors"
import { fetchWeather } from "./store/weather/actionCreators"
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

export interface Params {
    q: string;
    units: string;
}

const dropdawnOptions = [
    { value: 'metric', label: 'Metric, °C' },
    { value: 'imperial', label: 'Imperial, °F' },
    { value: 'standard', label: 'Standard, K' }
]


export const App = () => {

    const [params, setParams] = useState<Params>({
        q: "minsk",
        units: dropdawnOptions[0].value
    });
    const [inputValue, setInputValue] = useState("")


    const loadStatus = useSelector(getLoadStatus)
    const weather = useSelector(getWeatherFromStore)
    const isAuth = useSelector(getUserStatus)
    const dispatch = useDispatch()

    const updateParams = (nextParams: Partial<Params>) => {
        setParams((prevParams) => ({ ...prevParams, ...nextParams }));
    };

    const fetchWeatheDebounce = useCallback(debounce((params: Params) => dispatch(fetchWeather(params) as any), 1500), [dispatch])

    useEffect(() => fetchWeatheDebounce(params), [params])

    const infoItems: { icon?: any; label: string; key: string; unit: UnitsLabel }[] = [
        {
            icon: humIcon,
            label: "Humidity",
            key: 'humidity',
            unit: { metric: ' %', imperial: " %", standard: " %" }
        },
        {
            icon: pressureIcon,
            label: "Pressure",
            key: 'pressure',
            unit: { metric: ' gPa', imperial: " gPa", standard: " gPa" }
        },
        {
            icon: windIcon,
            label: "Wind",
            key: 'speed',
            unit: { metric: ' m/s', imperial: " miles/hour", standard: " m/s" }
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
                    <Input value={inputValue} onChange={(e) => setInputValue(e)} />
                    <button onClick={() => dispatch(logIn(inputValue))} >Log in</button>
                </div> :

                <div className={css.main}>
                    <Loader isLoading={loadStatus === "weather/loading"} />
                    {loadStatus === "weather/error" && (<span>Что-то пошло не так...</span>)}
                    <div className={css.container_left}>
                        <div className={css.logo}>
                            <img className={css.weatherIcon} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon' />
                        </div>
                        <div className={css.infoWeather}>
                            <p className={css.temperature}>
                                {/* @ts-ignore */}
                                {Math.round(weather.main.temp)} {unitLabels[params.units]}
                            </p>
                            <span className={css.temp_feel}>
                                {/* @ts-ignore */}
                                feels like {Math.round(weather.main.feels_like)} {unitLabels[params.units]}
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
                                        /* @ts-ignore */
                                        unit={item.unit[params.units]}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={css.container_right}>
                        <Input value={params.q} onChange={(q) => updateParams({ q })} />
                        <Dropdawn value={params.units} units={dropdawnOptions} onChange={(units) => updateParams({ units })} />

                    </div>
                </div>
            }
        </div>
    )
}
