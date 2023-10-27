import { store } from './store'
import { BrowserRouter,  Route, Routes } from 'react-router-dom'
import { LanguageProvider } from './components/LanguageProvider'
import { Orders } from './features/Orders'
import { Waiters } from './features/Waiters'
import { Dishes } from './features/Dishes'
import { Tables } from './features/Tables'
import { Provider } from 'react-redux'
import React from 'react'
import styles from './components/Page.module.css'

export function App () {
  const active = ({ isActive }) => isActive ? styles.active : ""

  return (
    <Provider store={store}>
      <BrowserRouter>
        <LanguageProvider>
          <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/waiter/*" element={<Waiters />} />
            <Route path="/about" element={<Dishes />} />
            <Route path='*' element={<Tables />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </Provider>
  )
}