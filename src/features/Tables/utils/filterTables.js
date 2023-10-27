export function filterTables (tables, filter) {
    if (filter === 'free') {
      return tables.filter(table => !table.reserved)
    } else if (filter === 'reserved') {
      return tables.filter(table => table.reserved)
    } else {
      return tables
    }
  }
  