import React, { useContext, useEffect, useState } from 'react'
import './TodayHighlights.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { WeatherContext } from '../../Context/WeatherContext'
import { faSun, faMoon, faEye } from '@fortawesome/free-regular-svg-icons'
import { faTemperatureLow, faDroplet, faWater } from '@fortawesome/free-solid-svg-icons'
import Loader from '../Loader/Loader'

const TodayHighlights = () => {
  
  const {loading, pollutionDetails, humidity, feelsLike, visibility, pressure, sunrise, sunset, aqi} = useContext(WeatherContext)

  const [airQualityIndex, setAirQualityIndex] = useState(4)
  const [cls, setCls] = useState('aqi-1')

  const setAQI = () =>{
    switch(aqi){
        case 1: setAirQualityIndex('Good')
                setCls('aqi-1')
        break;
        case 2: setAirQualityIndex('Fair')
                setCls('aqi-2')
        break;
        case 3: setAirQualityIndex('Moderate')
                setCls('aqi-3')
        break;
        case 4: setAirQualityIndex('Poor')
                setCls('aqi-4')
        break;
        case 5: setAirQualityIndex('Very Poor')
                setCls('aqi-5')
        break;
        default: setAirQualityIndex('Good')
    }
  }

  useEffect(()=>{

    setAQI()

  }, [aqi])

  return (
    <>
        {
            loading?(
                <Loader loader='loader-3'/>
            ):(
                <section>
                        <div className="card">
                            <h2 className="card-title"> Todays Highlights</h2>
                            <div className="highlight-list">
                                <div className="highlight-list-item">
                                    <div className="highlight-list-header">
                                        <h3 className='title-1'>Air Quality Index</h3>
                                        <span className={cls}>
                                            {airQualityIndex}
                                        </span>
                                    </div>
                                    <div className="wrapper">
                                        <div>
                                            <FontAwesomeIcon icon={faWind}/>
                                        </div>
                                        <ul className="card-list">
                                            <li className="card-item">
                                                <p className="title-1">
                                                    PM<sub>2.5</sub>
                                                </p>
                                                <p className="body-text-3">
                                                    {pollutionDetails?.components.pm2_5.toPrecision(3)}
                                                </p>
                                            </li>
                                            <li className="card-item">
                                                <p className="title-1">
                                                    SO<sub>2</sub>
                                                </p>
                                                <p className="body-text-3">
                                                    {pollutionDetails?.components.so2.toPrecision(3)}
                                                </p>
                                            </li>
                                            <li className="card-item">
                                                <p className="title-1">
                                                    NO<sub>2</sub>
                                                </p>
                                                <p className="body-text-3">
                                                    {pollutionDetails?.components.no2.toPrecision(3)}
                                                </p>
                                            </li>
                                            <li className="card-item">
                                                <p className="title-1">
                                                    O<sub>3</sub>
                                                </p>
                                                <p className="body-text-3">
                                                    {pollutionDetails?.components.o3.toPrecision(3)}
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="highlight-list-item">
                                    <h3 className='title-1'> Sunrise & Sunset</h3>
                                    <ul className="card-list">
                                        <li className="card-item">
                                            <FontAwesomeIcon icon={faSun} />
                                            <div className="time">
                                                <h3 className='title-1'>Sunrise</h3>
                                                <p className='body-text-3'>
                                                    {sunrise}
                                                </p>
                                            </div>
                                        </li>
                                        <li className="card-item">
                                            <FontAwesomeIcon icon={faMoon} />
                                            <div className="time">
                                                <h3 className='title-1'>Sunset</h3>
                                                <p className='body-text-3'>
                                                    {sunset}
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="highlight-list-item">
                                    <h3 className="title-1">Humidity</h3>
                                    <ul className="card-list">
                                        <li className="card-item">
                                            <FontAwesomeIcon icon={faDroplet}/>
                                        </li>
                                        <li className="card-item">
                                            <p className="body-text-3">
                                                {humidity}
                                                <sub>%</sub>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="highlight-list-item">
                                    <h3 className="title-1">Pressure</h3>
                                    <ul className="card-list">
                                        <li className="card-item">
                                            <FontAwesomeIcon icon={faWater}/>
                                        </li>
                                        <li className="card-item">
                                            <p className="body-text-3">
                                                {pressure}
                                                <sub>hba</sub>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="highlight-list-item">
                                    <h3 className="title-1">Visibility</h3>
                                    <ul className="card-list">
                                        <li className="card-item">
                                            <FontAwesomeIcon icon={faEye} />
                                        </li>
                                        <li className="card-item">
                                            <p className="body-text-3">
                                                {visibility/1000}
                                                <sub>KM</sub>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="highlight-list-item">
                                    <h3 className="title-1">Feels like</h3>
                                    <ul className="card-list">
                                        <li className="card-item">
                                            <FontAwesomeIcon icon={faTemperatureLow} />
                                        </li>
                                        <li className="card-item">
                                            <p className="body-text-3">
                                                {feelsLike}&deg;
                                                <sup>c</sup>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
            )
        }
    </>
  )
}

export default TodayHighlights