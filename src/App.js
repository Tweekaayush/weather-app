import React from 'react'
import './App.css'
import Navbar from './components/Layout/Navbar/Navbar'
import Footer from './components/Layout/Footer/Footer'
import { ThemeContextProvider } from './Context/ThemeContext'
import { WeatherContextProvider } from './Context/WeatherContext'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Error from './pages/Error/Error'

const App = () => {
  return (
    <ThemeContextProvider>
      <Router>
        <WeatherContextProvider>
            <Navbar/>
            <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route exact path='/notfound' element={<Error/>}/>
            </Routes>
            <Footer/>
        </WeatherContextProvider>
      </Router>
    </ThemeContextProvider>
  )
}

export default App