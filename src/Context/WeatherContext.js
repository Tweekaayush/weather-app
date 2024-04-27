import React, { createContext, useEffect, useState } from 'react'
import { getCurrentWeather, getAirPollutionDetails, getForecast, reverseGeo } from '../config/api'
import axios from 'axios'
import { getFullDate, getTime } from '../module'
import { useNavigate } from 'react-router-dom'

export const WeatherContext = createContext()

export const WeatherContextProvider = ({children}) => {

    const navigate = useNavigate()

    const [place, setPlace] = useState({
      name: '',
      country: ''
    })
  
    const [location, setLocation] = useState({
        lat: 28.6139,
        lon: 77.2088
    })

    const [time, setTime] = useState({
      sunrise: '',
      sunset: ''
    })

    const [currentWeatherData, setCurrentWeatherData] = useState({})

    const [curWeatherArray, setCurWeatherArray] = useState([])

    const [loading, setLoading] = useState({
      loading: true,
      locationLoading: false,
      nameAndCountryLoading: false,
      currentWeatherLoading: false, 
      forecastLoading: false,
      hourlyForecastLoading: false,
      pollutionLoading: false
    })

    const [fullDate, setFullDate] = useState('')

    const [dayForecast, setDayForecast] = useState([])

    const [pollutionDetails, setPollutionDetails] = useState([])

    const [hourlyForecast, setHourlyForecast] = useState([])

    const getLocation = async() =>{ 
        setLoading({...loading, locationLoading: true})
        await axios.get('https://api.ipify.org/?format=json')
        .then(async(res)=>{
          await axios.get(`https://ipinfo.io/${res.data?.ip}?token=c177813f87d9fa`)
          .then((resp)=>{
            const [latitude, longitude] = resp.data.loc.split(',')
            setLocation({
              lat: latitude,
              lon: longitude
            })
            setLoading({...loading, locationLoading: false})
            })
          }).catch((e)=>{
            navigate('/notfound')
          })
          setAllLoading()
    }

    const getNameAndCountry = async() =>{
      setLoading({...loading, nameAndCountryLoading: true})
      await axios.get(reverseGeo(location.lat, location.lon))
      .then((res)=>{
        const [{name, country}] = res.data
        setPlace({
          name: name,
          country: country
        })
        setLoading({...loading, nameAndCountryLoading: false})
      }).catch((e)=>{
        navigate('/notfound')
      })
      setAllLoading()

    }

    const currentWeather = async() =>{
        setLoading({...loading, currentWeatherLoading: true})
        await axios.get(getCurrentWeather(location.lat, location.lon))
        .then((res)=>{
            setLoading({...loading, currentWeatherLoading: false})
            setCurrentWeatherData(res.data)
            setFullDate(getFullDate(res.data.dt, res.data.timezone))
            setCurWeatherArray(res.data.weather[0])
            setTime({
              sunrise: getTime(res.data.sys.sunrise, res.data.timezone),
              sunset: getTime(res.data.sys.sunset, res.data.timezone)

            })
        }).catch((e)=>{
          navigate('/notfound')
        })
        setAllLoading()
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
        setLoading({...loading, forecastLoading: true})
        await axios.get(getForecast(location.lat, location.lon))
        .then((res)=>{
            setLoading({...loading, forecastLoading: false})
            getDaysForecast(res.data.list)
            getHourlyForecast(res.data.list)
        }).catch((e)=>{
          navigate('/notfound')
        })
        setAllLoading()
      }

      const getPollutionDetails = async() =>{
        setLoading({...loading, pollutionLoading: true})
    
        await axios.get(getAirPollutionDetails(location.lat, location.lon))
        .then((res)=>{
            setLoading({...loading, pollutionLoading: false})
            setPollutionDetails(res.data?.list)
        }).catch((e)=>{
          navigate('/notfound')
        })
        setAllLoading()
      }

      const setAllLoading = () =>{
          setLoading({
            ...loading, 
            loading: loading.locationLoading & loading.nameAndCountryLoading & loading.currentWeatherLoading & loading.forecastLoading & loading.hourlyForecastLoading & loading.pollutionLoading
          })
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
    loading: loading.loading,
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