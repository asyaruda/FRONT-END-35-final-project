import { TableApi } from '../api/server'
import {
  getListLoading,
  getListSuccess,
  getListError,
  setEditItem,
  createItem,
  updateItem,
  removeItem as removeItemAction,
} from './reducer'

export const getList = () => {
  return (dispatch) => {
    dispatch(getListLoading())
    TableApi
      .getList()
      .then((newList) => dispatch(getListSuccess(newList)))
      .catch((error) => dispatch(getListError(error.message)))
  }
}

export const saveItem = (table) => {
  return async (dispatch) => {
    if (table.id) {
      const newTable = await TableApi.update(table.id, table)

      dispatch(updateItem(newTable))
    } else {
      const newTable = await TableApi.create(table)

      dispatch(createItem(newTable))
    }
  }
}


export const getOneItem = (id) => {
  return (dispatch) => {
    TableApi.getOne(id).then((table) => dispatch(setEditItem(table)))
  }
};

export const removeItem = (id) => {
  return async (dispatch) => {
    await TableApi.delete(id)

    dispatch(removeItemAction(id))
  }
};