import { createSelector } from '@reduxjs/toolkit';
import { filterOrders } from '../utils/filterOrders';

export const orderListSelector = state => state.order.list
export const orderListLoadingSelector = state => state.order.listLoading
export const orderListErrorSelector = state => state.order.listError
export const orderFilterSelector = state => state.order.filter

export const orderListFilteredSelector = createSelector(
  orderListLoadingSelector,
  orderListErrorSelector,
  orderListSelector,
  orderFilterSelector,
  (loading, error, orders, filter) => {
    return {
      loading,
      error,
      orders: filterOrders(orders, filter),
      filter,
    }
  }
)