import { createSlice } from '@reduxjs/toolkit'
import { FILTERS } from '../constans'


const DEFAULT_TABLE = {
  number: '',
}

const initialState = {
  filter: FILTERS.ALL,
  editingTable: DEFAULT_TABLE,
  list: [],
  listLoading: false,
  listError: '',
}


export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    getListLoading: (state) => {
      state.listLoading = true
      state.listError = ''
    },
    getListSuccess: (state, { payload }) => {
      state.list = payload
      state.listLoading = false
    },
    getListError: (state, { payload }) => {
      state.listLoading = false
      state.listError = payload
    },
    setEditItem: (state, { payload }) => {
      state.editingTable = payload
    },
    removeItem: (state, { payload }) => {
      state.list = state.list.filter((table) => table.id !== payload)
    },
    createItem: (state, { payload }) => {
      state.editingTable = { ...DEFAULT_TABLE }
      state.list = [...state.list, payload]
    },
    updateItem: (state, { payload }) => {
      state.editingTable = DEFAULT_TABLE
      state.list = state.list.map((table) => table.id === payload.id ? payload : table)
    }
  },
})

export const action = tableSlice.actions
export default tableSlice.reducer

export const {
  getListLoading,
  getListSuccess,
  getListError,
  setEditItem,
  removeItem,
  createItem,
  updateItem,
} = tableSlice.actions