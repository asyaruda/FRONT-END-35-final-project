import { createSlice } from '@reduxjs/toolkit'
import { FILTERS } from '../constans'

const DEFAULT_ORDER = {
  waiterId: '',
  tableId: '',
  dishes: [
    {
      dishId: '',
      count: '',
    }
  ]
}

const initialState = {
  filter: FILTERS.ALL,
  editingOrder: DEFAULT_ORDER, 
  list: [],
  listLoading: false,
  listError: '',
}

export const orderSlice = createSlice({
  name: 'order',
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
      state.editingOrder = payload
    },
    removeItem: (state, { payload }) => {
      state.list = state.list.filter((order) => order.id !== payload)
    },
    createItem: (state, { payload }) => {
      state.editingOrder = { ...DEFAULT_ORDER }
      state.list = [...state.list, payload]
    },
    updateItem: (state, { payload }) => {
      state.editingOrder = DEFAULT_ORDER
      state.list = state.list.map((order) => order.id === payload.id ? payload : order)
    }
  },
})

export const actions = orderSlice.actions 
export default orderSlice.reducer

export const {
  getListLoading,
  getListSuccess,
  getListError,
  setEditItem,
  removeItem,
  createItem,
  updateItem,
} = orderSlice.actions
