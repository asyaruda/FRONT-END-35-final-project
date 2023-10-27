export function filterOrders (orders, filter) {
    if (filter === 'free') {
      return orders.filter(order => !order.reserved)
    } else if (filter === 'reserved') {
      return orders.filter(order => order.reserved)
    } else {
      return orders
    }
  }
  