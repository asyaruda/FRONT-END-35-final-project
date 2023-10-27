import { createSelector } from '@reduxjs/toolkit';
import { filterDishes } from '../utils/filterDishes';

export const dishListSelector = state => state.dish.list
export const dishListLoadingSelector = state => state.dish.listLoading
export const dishListErrorSelector = state => state.dish.listError
export const dishFilterSelector = state => state.dish.filter

export const dishListFilteredSelector = createSelector(
  dishListLoadingSelector,
  dishListErrorSelector,
  dishListSelector,
  dishFilterSelector,
  (loading, error, dishes, filter) => {
    return {
      loading,
      error,
      dishes: filterDishes(dishes, filter),
      filter,
    }
  }
)