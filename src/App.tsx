import { useState, useEffect } from "react"
import { Input, Info, Dropdawn } from "./components/common"
import { Weather, Units, UnitsLabel } from "./types"
import { getDate, getDay, getTime } from "./utils"
import { Loader } from "./components/common/Loader"
import css from "./app.module.css"
import humIcon from "./img/humidity-icon.svg"
import pressureIcon from "./img/pressure.svg"
import windIcon from "./img/wind-icon.svg"
import debounce from 'lodash/debounce';


enum LOAD_STATUSES {
    LOADING = "loading",
    ERROR = "error",
    LOADED = "loaded",
    UNKNOWN = "unknown"
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
    const [weather, setWeather] = useState<Weather>({
        main: { temp: 0, humidity: 0, feels_like: 0, pressure: 0 },
        wind: { speed: 0 },
        id: 0,
        weather: [{ icon: "04n" }],
    })
    const [loadStatus, setLoadStatus] = useState(LOAD_STATUSES.UNKNOWN)
    const [dropdawnOptions, setDropdawnOptions] = useState<{ value: Units, label: string }[]>(
        [
            { value: 'metric', label: 'Metric, °C' },
            { value: 'imperial', label: 'Imperial, °F' },
            { value: 'standard', label: 'Standard, K' }
        ])

    const isOffline = true

    useEffect(() => {
        if (isOffline) {
            return
        }
        setLoadStatus(LOAD_STATUSES.LOADING)
        myFetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${process.env.REACT_APP_OPEN_WEATHER_TOKEN}&units=${unit}`)

            .then((weather) => setWeather(weather))
            .then(() => { setLoadStatus(LOAD_STATUSES.LOADED) })
            .catch(() => { setLoadStatus(LOAD_STATUSES.ERROR) })
    }, [])

    useEffect(() => {
        if (isOffline) {
            return
        }
        setLoadStatus(LOAD_STATUSES.LOADING)
        myFetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=a7e03ffabe5b1e62a91464877799652d&units=${unit}`)
            .then((weather) => setWeather(weather))
            .then(() => { setLoadStatus(LOAD_STATUSES.LOADED) })
            .catch(() => { setLoadStatus(LOAD_STATUSES.ERROR) })
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
        <div className={css.main}>
            <Loader isLoading={loadStatus === LOAD_STATUSES.LOADING} />
            {loadStatus === LOAD_STATUSES.ERROR && (<span>Что-то пошло не так...</span>)}
            <div className={css.container_left}>
                <div className={css.logo}>
                    <img className={css.weatherIcon} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon' />
                </div>
                <div className={css.infoWeather}>
                    <p className={css.temperature}>
                        {/* @ts-ignore */}
                        {Math.round(weather?.main.temp!)} {unitLabels[unit]}
                    </p>
                    <span className={css.temp_feel}>
                        {/* @ts-ignore */}
                        feels like {Math.round(weather?.main.feels_like!)} {unitLabels[unit]}
                    </span>
                    <p className={css.date}>{getDate()}</p>
                    <p className={css.day}>{getDay()} {getTime()}</p>
                    <ul className={css.list}>
                        {infoItems.map((item) => (
                            <Info
                                key={item.key}
                                icon={item.icon}
                                label={item.label}
                                // @ts-ignore
                                value={weather?.main[item.key] || weather.wind.speed}
                                // @ts-ignore
                                unit={item.unit[unit]}
                            />
                        ))}
                    </ul>
                </div>
            </div>
            <div className={css.container_right}>
                <Input value={searchCity} onChange={(searchCity) => setSearchCity(searchCity)} />
                <Dropdawn value={unit} units={dropdawnOptions} onChange={(e) => setUnit(e.target.value)} />

            </div>
        </div>
    )
}
