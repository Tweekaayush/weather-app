import React, { createContext, useState } from 'react'

export const ThemeContext = createContext()

export const ThemeContextProvider = ({children}) => {

    const [theme, setTheme] = useState('dark')

    const changeTheme = () => {
        if(theme === 'dark'){
          setTheme('light')
          document.body.classList.add('light-theme')
        }
        else{
          setTheme('dark')
          document.body.classList.remove('light-theme')
        }
    }

    const value = {
        theme,
        changeTheme
    }
  return (
    <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
  )
}