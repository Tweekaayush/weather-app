import React, { useContext } from 'react'
import './CurrentWeather.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { WeatherContext } from '../../Context/WeatherContext'

const CurrentWeather = () => {

  const {temperature, curWeatherIcon, curWeatherDescription, city, country, loading, fullDate} = useContext(WeatherContext)
  
  return (
    <>
    {   
        loading?(
            <></>   
        ):(
            <section className='current-weather'>
                <div className="card">
                    <h2 className='card-title'>Now</h2>
                    <div className="current-weather-container">
                        <p className="heading">
                            {temperature}
                            &deg;
                            <sup>c</sup>
                        </p>
                        <img src={`images/${curWeatherIcon}.png`} className='weather-icon' alt={curWeatherDescription}/>
                    </div>
                    <p>
                        {curWeatherDescription}
                    </p>
                    <ul className='weather-metadata'>
                        <li className="metadata-item">
                            <FontAwesomeIcon icon={faCalendar}/>
                            <p className='body-text-1'>
                                {
                                    fullDate
                                }
                            </p>
                        </li>
                        <li className="metadata-item">
                            <FontAwesomeIcon icon={faLocationDot}/>
                            <p className='body-text-1'>
                                {city}, {country}
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
        )
    }
    </>
  )
}

export default CurrentWeather