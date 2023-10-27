export function filterDishes (dishes, filter) {
    if (filter === 'free') {
      return dishes.filter(dish => !dish.reserved)
    } else if (filter === 'reserved') {
      return dishes.filter(dish => dish.reserved)
    } else {
      return dishes
    }
  }
  