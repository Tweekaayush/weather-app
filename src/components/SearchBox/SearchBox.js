import React, { useContext, useState } from 'react'
import './SearchBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faMagnifyingGlass, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {geo} from '../../config/api'
import axios from 'axios'
import { WeatherContext } from '../../Context/WeatherContext'

const SearchResultItem = (props) =>{

    const {setLocation} = useContext(WeatherContext)

    const handleLocation = (lat, lon) =>{

        setLocation({
            lat: lat,
            lon: lon
        })

        props.setSearch('')
        props.setArray([])
        props.handleOpen()
      }
    
    const handleMouseOver = () =>{
        props.setCurIdx(props.id)
    }
      

    return(
        <li className={props.id === props.curIdx?`search-result-item search-result-item-active`:`search-result-item`} onClick={() => handleLocation(props.lat, props.lon)} onMouseOver={handleMouseOver}> 
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

  const handleLocation = (lat, lon) =>{

      setLocation({
          lat: lat,
          lon: lon
      })

      setSearch('')
      setArray([])
      handleOpen()
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
        })
    }
  }

  const handleOpen = () =>{
    props.setOpen(false)
  }

  const handleBlur = () =>{
    setCls('search-result-container-blur')
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

  return (
    <div className={props.open?"nav-search nav-search-active":'nav-search'} onBlur={handleBlur} onFocus={handleFocus}>
        <div className="search-wrapper">
            <input type="search" name="search" value={search} placeholder='search city...' onChange={handleChange} autoComplete='off' onKeyDown={handleKeyDown}/>
            <span className='search-box-icon'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <span className='search-box-arrow' onClick={handleOpen}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </span>
        </div>
        <ul className={`search-result-container ${cls}`} data-search-result>
            {
                array.map((item, i)=>{
                    return <SearchResultItem id={i} key={item.id} title={item.name} subTitle={item.country} lat={item.lat} lon={item.lon} setSearch ={setSearch} setArray={setArray} handleOpen={handleOpen} setCurIdx={setCurIdx} curIdx={curIdx}/>
                })
            }
        </ul>
    </div>
  )
}

export default SearchBox