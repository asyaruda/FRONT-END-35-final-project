import React from 'react'
import { EditForm } from './EditForm'
import { DishesList } from './DishesList'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from '../NotFound'

export function Dishes () {
  return (
    <Routes>
      <Route path="/" element={<DishesList />} />
      <Route path="/edit" element={<EditForm />} />
      <Route path="/edit/:dishId" element={<EditForm />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}



