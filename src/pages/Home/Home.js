import React, {useEffect} from 'react'
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather'
import Forecast from '../../components/Forecast/Forecast'
import TodayHighlights from '../../components/TodayHighlights/TodayHighlights'
import HourlyForecast from '../../components/HourlyForecast/HourlyForecast'

const Home = () => {

  useEffect(()=>{
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container">
        <div className="left-content">
            <CurrentWeather/>
            <Forecast/>
        </div>
        <div className="right-content">
            <TodayHighlights />
            <HourlyForecast />
        </div>
    </div>
  )
}

export default Home