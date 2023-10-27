export function filterWaiters (waiters, filter) {
    if (filter === 'active') {
      return waiters.filter(waiter => !waiter.blocked)
    } else if (filter === 'blocked') {
      return waiters.filter(waiter => waiter.blocked)
    } else {
      return waiters
    }
  }
  