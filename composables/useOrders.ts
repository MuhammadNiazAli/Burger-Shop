interface OrderLine {
  name: string
  qty: number
  price: number
}

interface Order {
  id: string
  placedAt: string
  lines: OrderLine[]
  total: number
}

const ORDERS_KEY = 'cc_orders'
const orders = useState<Order[]>('cc_orders', () => [])
const loaded = useState<boolean>('cc_orders_loaded', () => false)

export function useOrders() {
  function load() {
    if (import.meta.server || loaded.value) return
    try {
      const raw = localStorage.getItem(ORDERS_KEY)
      orders.value = raw ? JSON.parse(raw) : []
    } catch {
      orders.value = []
    }
    loaded.value = true
  }

  function record(lines: OrderLine[], total: number) {
    const order: Order = {
      id: Math.random().toString(36).slice(2, 8).toUpperCase(),
      placedAt: new Date().toISOString(),
      lines,
      total
    }
    orders.value = [order, ...orders.value]
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders.value))
  }

  return { orders, load, record }
}
