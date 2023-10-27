import { WaiterApi } from '../api/server'
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
    WaiterApi
      .getList()
      .then((newList) => dispatch(getListSuccess(newList)))
      .catch((error) => dispatch(getListError(error.message)))
  }
}

export const saveItem = (waiter) => {
  return async (dispatch) => {
    if (waiter.id) {
      const newWaiter = await WaiterApi.update(waiter.id, waiter)

      dispatch(updateItem(newWaiter))
    } else {
      const newWaiter = await WaiterApi.create(waiter)

      dispatch(createItem(newWaiter))
    }
  }
}


export const getOneItem = (id) => {
  return (dispatch) => {
    WaiterApi.getOne(id).then((waiter) => dispatch(setEditItem(waiter)))
  }
};

export const removeItem = (id) => {
  return async (dispatch) => {
    await WaiterApi.delete(id)

    dispatch(removeItemAction(id))
  }
};