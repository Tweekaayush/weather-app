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

    return(
        <li className='search-result-item' onClick={() => handleLocation(props.lat, props.lon)}> 
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

  const handleChange = async(e) => {

    const {value} = e.target

    setSearch(value)

    if (value === '')
        setArray([])
    else{   

        await axios.get(geo(value))
        .then((res)=>{
            setArray(res.data)
        })
        // arr =  locations.filter((item)=>{
        //     if(value === '')
        //     return item
        // else 
        // return item.title.toLowerCase().includes(value.toLowerCase())
        // })
        // setArray(arr)
    }
  }

  const handleOpen = () =>{
    props.setOpen(false)
  }

  return (
    <div className={props.open?"nav-search nav-search-active":'nav-search'}>
        <div className="search-wrapper">
            <input type="search" name="search" value={search} placeholder='search city...' onChange={handleChange} autoComplete='off'/>
            <span className='search-box-icon'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <span className='search-box-arrow' onClick={handleOpen}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </span>
        </div>
        <ul className="search-result-container" data-search-result>
            {
                array.map((item, i)=>{
                    return <SearchResultItem id={item.id} key={item.id} title={item.name} subTitle={item.country} lat={item.lat} lon={item.lon} setSearch ={setSearch} setArray={setArray} handleOpen={handleOpen}/>
                })
            }
        </ul>
    </div>
  )
}

export default SearchBox