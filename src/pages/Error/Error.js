import React, {useContext, useEffect} from 'react'
import './Error.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { WeatherContext } from '../../Context/WeatherContext'

const Error = () => {

  const {setLocation} = useContext(WeatherContext)

  const navigate = useNavigate()

  const handleRedirect = () =>{

    setLocation({
      lat: 28.6139,
      lon: 77.2088
    })

    navigate('/')

  }

  useEffect(()=>{
    window.scrollTo(0, 0)
  }, [])

  return (
    <section id="error">
        <div className="error-container">
            <h1 className='title-3'>Sorry, we could not find the place your were looking for!</h1>
            <span to="/" onClick={handleRedirect}>
              <FontAwesomeIcon icon={faAngleLeft}/>
              Go Back
            </span>
        </div>
    </section>
  )
}

export default Error