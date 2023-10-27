import { DishesApi } from '../api/server'
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
    DishesApi
      .getList()
      .then((newList) => dispatch(getListSuccess(newList)))
      .catch((error) => dispatch(getListError(error.message)))
  }
}

export const saveItem = (dish) => {
  return async (dispatch) => {
    if (dish.id) {
      const newDish = await DishesApi.update(dish.id, dish)

      dispatch(updateItem(newDish))
    } else {
      const newDish = await DishesApi.create(dish)

      dispatch(createItem(newDish))
    }
  }
}


export const getOneItem = (id) => {
  return (dispatch) => {
    DishesApi.getOne(id).then((dish) => dispatch(setEditItem(dish)))
  }
};

export const removeItem = (id) => {
  return async (dispatch) => {
    await DishesApi.delete(id)

    dispatch(removeItemAction(id))
  }
};