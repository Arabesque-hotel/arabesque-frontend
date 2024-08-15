import React, {useState, createContext, useContext, useEffect } from 'react'

const defaultLanguageContext = {
  currentLanguage:"",
  setLanguage: () => {} 
};

const LanguageContext = createContext(defaultLanguageContext);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({children}) => {
  const [currentLanguage,setCurrentLanguage] = useState('')

  const setLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language',lang);
    window.location.reload();
  }

  useEffect(()=> {
    if(!localStorage.getItem('language')) {
      localStorage.setItem('language','en')
    }
    setCurrentLanguage(localStorage.getItem('language'))
  },[])

  return (
    <LanguageContext.Provider value={{currentLanguage,setLanguage}}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider