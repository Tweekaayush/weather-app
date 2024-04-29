import React, { useContext, useState, useRef, useEffect } from 'react'
import './SearchBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faMagnifyingGlass, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {geo} from '../../config/api'
import axios from 'axios'
import { WeatherContext } from '../../Context/WeatherContext'
import { useNavigate } from 'react-router-dom'

const SearchResultItem = (props) =>{

    const {setLocation} = useContext(WeatherContext)
    const navigate = useNavigate()

    const handleLocation = (lat, lon) =>{

        setLocation({
            lat: lat,
            lon: lon
        })

        props.setSearch('')
        props.setArray([])
        props.handleOpen()
        navigate('/')
      }
    
    const handleMouseOver = () =>{
        props.setCurIdx(props.id)
    }

    const handleClick = () =>{
        handleLocation(props.lat, props.lon)
    }
      

    return(
        <li 
        className={props.id === props.curIdx?`search-result-item search-result-item-active`:`search-result-item`} 
        onClick={handleClick} 
        onMouseOver={handleMouseOver}
        > 
            <span className='location-icon'>
                <FontAwesomeIcon icon={faLocationDot}/>
            </span>
            <div className="search-result-wrapper">
                <p className="search-result-title">
                    {props.title}
                </p>
                <p className="search-result-sub-title">
                    {props.subTitle}
                </p>
            </div>
        </li>
    )
}

const SearchBox = (props) => {

  const [array, setArray] = useState([])

  const [search, setSearch] = useState('')

  const [cls, setCls] = useState('')

  const [curIdx, setCurIdx] = useState(0)

  const {setLocation} = useContext(WeatherContext)

  const navigate = useNavigate()

  const ref = useRef(null)

  const handleLocation = (lat, lon) =>{

      setLocation({
          lat: lat,
          lon: lon
      })

      setSearch('')
      setArray([])
      handleOpen()
      navigate('/')
  }
  

  const handleChange = async(e) => {

    const {value} = e.target

    setSearch(value)

    if (value === '')
        setArray([])
    else{   

        await axios.get(geo(value))
        .then((res)=>{
            setArray(res.data)
            setCurIdx(0)
        }).catch((e)=>{
            console.log(e)
        })
    }
  }

  const handleOpen = () =>{
    props.setOpen(false)
  }

  const handleFocus = () =>{
    setCls('')
  }

  const handleKeyDown = (e) =>{

    const {keyCode} = e

    if(keyCode === 13){
        handleLocation(array[curIdx]?.lat, array[curIdx]?.lon)
    }
    else if(keyCode === 40){
        setCurIdx((curIdx+1)%array.length)
    }
    else if(keyCode === 38){
        let i = curIdx - 1
        if(i === -1)
            i = array.length - 1
        setCurIdx((i)%array.length)
    }
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
        setCls('search-result-container-blur')
    }
}

  useEffect(()=>{



    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [])

  return (
    <div className={props.open?"nav-search nav-search-active":'nav-search'} onFocus={handleFocus} ref={ref}>
        <div className="search-wrapper">
            <input type="search" name="search" value={search} placeholder='search city...' onChange={handleChange} autoComplete='off' onKeyDown={handleKeyDown}/>
            <span className='search-box-icon'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <span className='search-box-arrow' onClick={handleOpen}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </span>
        </div>
        <ul className={`search-result-container ${cls}`}>
            {
                array.map((item, i)=>{
                    return <SearchResultItem 
                        id={i} 
                        key={i} 
                        title={item.name} 
                        subTitle={item.country} 
                        lat={item.lat} 
                        lon={item.lon} 
                        setSearch ={setSearch} 
                        setArray={setArray} 
                        handleOpen={handleOpen} 
                        setCurIdx={setCurIdx} 
                        curIdx={curIdx}
                    />
                })
            }
        </ul>
    </div>
  )
}

export default SearchBox