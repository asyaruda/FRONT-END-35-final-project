import { OrdersApi } from '../api/server'
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
    OrdersApi
      .getList()
      .then((newList) => dispatch(getListSuccess(newList)))
      .catch((error) => dispatch(getListError(error.message)))
  }
}

export const saveItem = (order) => {
  return async (dispatch) => {
    if (order.id) {
      const newOrder = await OrdersApi.update(order.id, order)

      dispatch(updateItem(newOrder))
    } 
      else {
      const newOrder = await OrdersApi.create(order)

      dispatch(createItem(newOrder))
    }
  }
}

export const getOneItem = (id) => {
  return (dispatch) => {
    OrdersApi.getOne(id).then((order) => dispatch(setEditItem(order)))
  }
};

export const removeItem = (id) => {
  return async (dispatch) => {
    await OrdersApi.delete(id)

    dispatch(removeItemAction(id))
  }
};