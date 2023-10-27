import React from 'react'
import { EditForm } from './EditForm'
import { TableList } from './TableList'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from '../NotFound'

export function Table () {
  return (
    <Routes>
      <Route path="/" element={<TableList />} />
      <Route path="/edit" element={<EditForm />} />
      <Route path="/edit/:tableId" element={<EditForm />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}



