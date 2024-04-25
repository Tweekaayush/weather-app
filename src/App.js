import React from 'react'
import './App.css'
import Navbar from './components/Layout/Navbar/Navbar'
import Footer from './components/Layout/Footer/Footer'
import CurrentWeather from './components/CurrentWeather/CurrentWeather'
import Forecast from './components/Forecast/Forecast'
import TodayHighlights from './components/TodayHighlights/TodayHighlights'
import HourlyForecast from './components/HourlyForecast/HourlyForecast'
import { ThemeContextProvider } from './Context/ThemeContext'
import { WeatherContextProvider } from './Context/WeatherContext'

const App = () => {
  return (
    <ThemeContextProvider>
      <WeatherContextProvider>
        <Navbar/>
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
        <Footer/>
      </WeatherContextProvider>
    </ThemeContextProvider>
  )
}

export default App