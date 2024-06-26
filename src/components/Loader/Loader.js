import React from 'react'
import './Loader.css'

const Loader = (props) => {
  return (
    <div className={`loader ${props.loader}`}></div>
  )
}

export default Loader