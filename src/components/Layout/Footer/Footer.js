import React, { useEffect, useState } from 'react'
import './Footer.css'

const Footer = () => {

  const [year, setYear] = useState('')

  const getYear = () => {
    setYear(new Date().getFullYear())
  }

  useEffect(()=>{
    getYear()
  },[])

  return (
    <footer>
        <p className="body-text-1">
          &copy; {year} Aayush Dobriyal. All Rights Reserved.
        </p>
    </footer>
  )
}

export default Footer