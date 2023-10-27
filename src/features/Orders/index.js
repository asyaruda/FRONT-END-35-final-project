import React from 'react'
import { EditForm } from './EditForm'
import { OrdersList } from './OrdersList'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from '../NotFound'

export function Orders () {
  return (
    <Routes>
      <Route path="/" element={<OrdersList />} />
      <Route path="/edit" element={<EditForm />} />
      <Route path="/edit/:orderId" element={<EditForm />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}



