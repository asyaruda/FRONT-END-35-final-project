import { createSelector } from '@reduxjs/toolkit';
import { filterWaiters } from '../utils/filterWaiters';

export const waiterListSelector = state => state.waiter.list
export const waiterListLoadingSelector = state => state.waiter.listLoading
export const waiterListErrorSelector = state => state.waiter.listError
export const waiterFilterSelector = state => state.waiter.filter

export const waiterListFilteredSelector = createSelector(
  waiterListLoadingSelector,
  waiterListErrorSelector,
  waiterListSelector,
  waiterFilterSelector,
  (loading, error, waiters, filter) => {
    return {
      loading,
      error,
      waiters: filterWaiters(waiters, filter),
      filter,
    }
  }
)