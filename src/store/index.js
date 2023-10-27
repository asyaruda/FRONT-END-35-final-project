import { configureStore } from '@reduxjs/toolkit'
import waiterReducer from '../features/Waiters/features/Waiter/store/reducer'
import dishReducer from '../../src/features/Dishes/features/Dishes/store/reducer'  
import tableReducer from '../../src/features/Tables/features/Table/store/reducer'
import orderReducer from '../../src/features/Orders/features/Orders/store/reducer'



export const store = configureStore({
  reducer: {
    waiter: waiterReducer,
    dish: dishReducer,
    table: tableReducer,
    order: orderReducer
  },
})