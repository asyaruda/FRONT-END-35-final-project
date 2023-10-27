import { createContext, useContext, useState } from 'react'

const DEFAULT_LANG = 'en';

export const LanguageContext = createContext();

export function useLang () {
  return useContext(LanguageContext)
}

export function LanguageProvider ({ children }) {
  const [lang, setLang] = useState(DEFAULT_LANG)

  const toggleLang = () => {
    setLang(lang === DEFAULT_LANG ? 'ua' : DEFAULT_LANG)
  }

  const translate = (enStr, uaStr) => {
    return lang === DEFAULT_LANG ? enStr : uaStr
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, translate }}>
      {children}
    </LanguageContext.Provider>
  )
}