import React, { createContext, useEffect, useState } from 'react'
import { getCurrentWeather, getAirPollutionDetails, getForecast, reverseGeo } from '../config/api'
import axios from 'axios'
import { getFullDate, getTime } from '../module'

export const WeatherContext = createContext()

export const WeatherContextProvider = ({children}) => {

    const [place, setPlace] = useState({
      name: '',
      country: ''
    })
  
    const [location, setLocation] = useState({
        lat: 28.7041,
        lon: 77.1025
    })

    const [time, setTime] = useState({
      sunrise: '',
      sunset: ''
    })

    const [currentWeatherData, setCurrentWeatherData] = useState({})

    const [curWeatherArray, setCurWeatherArray] = useState([]) 

    const [loading, setLoading] = useState(true)

    const [fullDate, setFullDate] = useState('')

    const [dayForecast, setDayForecast] = useState([])

    const [pollutionDetails, setPollutionDetails] = useState([])

    const [hourlyForecast, setHourlyForecast] = useState([])

    const getLocation = async() =>{ 

        await axios.get('https://api.ipify.org/?format=json')
        .then(async(res)=>{
          await axios.get(`https://ipinfo.io/${res.data?.ip}?token=c177813f87d9fa`)
          .then((resp)=>{
            const [latitude, longitude] = resp.data.loc.split(',')
            setLocation({
              lat: latitude,
              lon: longitude,
              visited: true
            })
            })
          }).catch(e=>console.log(e))
    }

    const getNameAndCountry = async() =>{
      setLoading(true)
      await axios.get(reverseGeo(location.lat, location.lon))
      .then((res)=>{
        const [{name, country}] = res.data
        setPlace({
          name: name,
          country: country
        })
      }).catch(e=>console.log(e))

    }

    const currentWeather = async() =>{
        setLoading(true)
        await axios.get(getCurrentWeather(location.lat, location.lon))
        .then((res)=>{
            setLoading(false)
            setCurrentWeatherData(res.data)
            setFullDate(getFullDate(res.data.dt, res.data.timezone))
            setCurWeatherArray(res.data.weather[0])
            setTime({
              sunrise: getTime(res.data.sys.sunrise, res.data.timezone),
              sunset: getTime(res.data.sys.sunset, res.data.timezone)

            })
        }).catch(e=>console.log(e))
    }

    const getDaysForecast = (array) =>{
      const temp = []
      for(let i = 7; i<array.length; i+=8){
          temp.push(array[i])
      }
      setDayForecast(temp)
    }

    const getHourlyForecast = (array) =>{
      const temp = []
      for(let i = 0; i<8; i+=1){
          temp.push(array[i])
      }
      setHourlyForecast(temp)
    }

    const forecast = async() =>{
        setLoading(true)
        await axios.get(getForecast(location.lat, location.lon))
        .then((res)=>{
            setLoading(false)
            getDaysForecast(res.data.list)
            getHourlyForecast(res.data.list)
        }).catch(e=>console.log(e))
      }

      const getPollutionDetails = async() =>{
        setLoading(true)
    
        await axios.get(getAirPollutionDetails(location.lat, location.lon))
        .then((res)=>{
            setLoading(false)
            setPollutionDetails(res.data?.list)
        }).catch(e=>console.log(e))
      }


      
  useEffect(()=>{

    getNameAndCountry()
    currentWeather();
    forecast();
    getPollutionDetails();

  }, [location.lat, location.lon])  

  const value = {
    temperature: currentWeatherData?.main?.temp,
    dt: currentWeatherData?.dt,
    fullDate,
    timezone: currentWeatherData?.timezone,
    curWeather: currentWeatherData?.weather,
    curWeatherIcon: curWeatherArray?.icon,
    curWeatherDescription: curWeatherArray?.description,
    city: place?.name,
    country: place?.country,
    humidity: currentWeatherData?.main?.humidity,
    feelsLike: currentWeatherData?.main?.feels_like,
    pressure: currentWeatherData?.main?.pressure,
    visibility: currentWeatherData?.visibility,
    loading,
    dayForecast: dayForecast,
    pollutionDetails: pollutionDetails[0],
    aqi: pollutionDetails[0]?.main?.aqi,
    sunrise: time.sunrise,
    sunset: time.sunset,
    hourlyForecast: hourlyForecast,
    setLocation,
    getLocation
  }
  return (
    <WeatherContext.Provider value={value}>
        {children}
    </WeatherContext.Provider>
  )
}