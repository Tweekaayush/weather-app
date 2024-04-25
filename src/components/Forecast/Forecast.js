import React, { useContext } from 'react'
import './Forecast.css'
import { getDayName, getMonthName } from '../../module'
import { WeatherContext } from '../../Context/WeatherContext'

const Forecast = () => {

  const {loading, dayForecast} = useContext(WeatherContext)

  return (
    <>
        {
            loading?(   
                <>
                </>
            ):(
            <section>
                <h2 className='title-2'>5 Days Forecast</h2>
                <div className="card">
                    <ul className='forecast-list'>
                        {
                            dayForecast.map((item, i)=>{
                                const d = new Date(item.dt_txt)
                                let day = getDayName(d.getDay())
                                let date = `${d.getDate()} ${getMonthName(d.getMonth())}`
                                return (
                                    <li key={i} className="forecast-list-item">
                                        <div className="weather-details-wrap">
                                            <img src={`images/${item?.weather[0].icon}.png`} alt={item?.weather[0].description} className='weather-icon-2' />
                                            <p>
                                                {item.main.temp}
                                                &deg;
                                            </p>
                                        </div>
                                        <p className='body-text-1'>
                                            {date}
                                        </p>
                                        <p className='body-text-1'>
                                            {day}
                                        </p>
                                    </li>
                                )    
                            })
                        }
                    </ul>
                </div>
            </section>
            )
        }
    </>
    
  )
}

export default Forecast