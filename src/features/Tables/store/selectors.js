import { createSelector } from '@reduxjs/toolkit';
import { filterTables } from '../utils/filterTables';

export const tableListSelector = state => state.table.list
export const tableListLoadingSelector = state => state.table.listLoading
export const tableListErrorSelector = state => state.table.listError
export const tableFilterSelector = state => state.table.filter

export const tableListFilteredSelector = createSelector(
  tableListLoadingSelector,
  tableListErrorSelector,
  tableListSelector,
  tableFilterSelector,
  (loading, error, tables, filter) => {
    return {
      loading,
      error,
      tables: filterTables(tables, filter),
      filter,
    }
  }
)