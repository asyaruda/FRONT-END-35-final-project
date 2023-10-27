import { createSlice } from '@reduxjs/toolkit'
import { FILTERS } from '../constans'


const DEFAULT_DISH = {
  "name": '',
  "description": '',
  "price": ''
}

const initialState = {
  filter: FILTERS.ALL,
  editingTable: DEFAULT_DISH,
  list: [],
  listLoading: false,
  listError: '',
}


export const dishSlice = createSlice({
  name: 'dish',
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
      state.editingDish = payload
    },
    removeItem: (state, { payload }) => {
      state.list = state.list.filter((dish) => dish.id !== payload)
    },
    createItem: (state, { payload }) => {
      state.editingDish = { ...DEFAULT_DISH }
      state.list = [...state.list, payload]
    },
    updateItem: (state, { payload }) => {
      state.editingDish = DEFAULT_DISH
      state.list = state.list.map((dish) => dish.id === payload.id ? payload : dish)
    }
  },
})

export const action = dishSlice.actions
export default dishSlice.reducer

export const {
  getListLoading,
  getListSuccess,
  getListError,
  setEditItem,
  removeItem,
  createItem,
  updateItem,
} = dishSlice.actions