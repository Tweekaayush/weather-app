import React, { useContext } from 'react'
import './HourlyForecast.css'
import { WeatherContext } from '../../Context/WeatherContext'
import { getTime, mps_to_kmh } from '../../module'

const HourlyForecast = () => {

  const {loading, hourlyForecast, timezone} = useContext(WeatherContext)

  return (

    <>
        {loading?(
            <></>
        ):(
            <section>
                <h2 className='title-2'>Today at</h2>
                <div className="slider-container">
                    <ul className="slider-list">
                        {
                            hourlyForecast?.map((data, i)=>{
                                const{
                                    dt,
                                    main: {temp},
                                    weather,
                                }=data;
                                const[{icon,description}]=weather;
                                return(      
                                    <li key={i} id={i} className="slider-item">
                                        <div className="card">
                                            <p className="body-text-2">
                                                {getTime(dt, timezone)}
                                            </p>
                                            <img src={`images/${icon}.png`} alt={description} className='weather-icon' />
                                            <p className="body-text-2">
                                                {temp}&deg;
                                            </p>
                                        </div>
                                    </li>
                            );
                            })
                        }
                    </ul>
                    <ul className="slider-list">
                        {
                            hourlyForecast?.map((data, i)=>{
                                const{
                                    dt,
                                    weather,
                                    wind: {deg:windDirection, speed:windSpeed}
                                }=data;
                                const[{description}]=weather;
                                return(      
                                    <li key={i} id={i} className="slider-item">
                                        <div className="card">
                                            <p className="body-text-2">
                                                {getTime(dt, timezone)}
                                            </p>
                                            <img src={`images/direction.png`} alt={description} style={{transform : `rotate(${windDirection - 180}deg`}} className='weather-icon'/>
                                            <p className="body-text-2">
                                                {mps_to_kmh(windSpeed).toPrecision(3)}
                                                Km/h
                                            </p>
                                        </div>
                                    </li>
                            );
                            })
                        }
                    </ul>
                </div>
            </section>   
    )}
    </>
  )
}

export default HourlyForecast