import React, { useState, useEffect, useContext } from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faLocationCrosshairs, faMagnifyingGlass, faCloud} from '@fortawesome/free-solid-svg-icons'
import SearchBox from '../../SearchBox/SearchBox'
import { ThemeContext } from '../../../Context/ThemeContext'
import { WeatherContext } from '../../../Context/WeatherContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    
  const {theme, changeTheme} = useContext(ThemeContext)

  const {getLocation, setLocation} = useContext(WeatherContext)

  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  const handleTheme = () =>{
    changeTheme()
  }

  const handleResize = () =>{
    if(document.body.clientWidth > 1200)
        setOpen(false)
  }

  const handleRedirect = () =>{

    setLocation({
      lat: 28.6139,
      lon: 77.2088
    })

    navigate('/')

  }
  
  useEffect(()=>{
    window.addEventListener("resize", handleResize)
    
    return ()=>{
      window.removeEventListener("resize", handleResize)
    }
  }, [])
    
  return (
    <nav className='navbar'>
        <div className="nav-brand">
          <FontAwesomeIcon icon={faCloud}/>
          <span onClick={handleRedirect}>Weatherly</span>
        </div>
        <SearchBox open={open} setOpen={setOpen}/>
        <div className="nav-items">
            <span className='search-btn' onClick={()=>setOpen(true)}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </span>
            <div className="theme-switch-btn" htmlFor='theme' onClick={handleTheme}>
                {
                    theme === 'dark'? <FontAwesomeIcon icon={faMoon} className='dark-theme-btn'/>: <FontAwesomeIcon icon={faSun} className='light-theme-btn'/>
                }
            </div>
            <div className="current-location" onClick={()=>getLocation()}>
                <FontAwesomeIcon icon={faLocationCrosshairs}/>
                <p>Current location</p>
            </div>
        </div>
    </nav>
  )
}

export default Navbar