export interface OrderLine {
  id: string
  name: string
  qty: number
  price: number
}

export interface OrderAddress {
  street: string
  city: string
  phone: string
}

export type PaymentMethod = 'cod' | 'card'

export interface Order {
  id: string
  placedAt: string
  lines: OrderLine[]
  total: number
  address: OrderAddress
  payment: PaymentMethod
}

/** Order lifecycle stages. Status is derived live from elapsed time since
 * placedAt rather than stored, so it keeps progressing in real time even
 * across page reloads — no backend required. */
export const ORDER_STAGES = [
  { key: 'placed', label: 'Order placed', minutesFromStart: 0 },
  { key: 'preparing', label: 'Preparing on the grill', minutesFromStart: 1 },
  { key: 'out', label: 'Out for delivery', minutesFromStart: 4 },
  { key: 'delivered', label: 'Delivered', minutesFromStart: 9 }
] as const

export type OrderStageKey = (typeof ORDER_STAGES)[number]['key']

export function orderStatus(placedAt: string, now: number = Date.now()) {
  const elapsedMinutes = (now - new Date(placedAt).getTime()) / 60000
  let stageIndex = 0
  for (let i = 0; i < ORDER_STAGES.length; i++) {
    if (elapsedMinutes >= ORDER_STAGES[i].minutesFromStart) stageIndex = i
  }
  const stage = ORDER_STAGES[stageIndex]
  const next = ORDER_STAGES[stageIndex + 1]
  const progress = next
    ? Math.min(
        100,
        Math.round(
          ((elapsedMinutes - stage.minutesFromStart) / (next.minutesFromStart - stage.minutesFromStart)) * 100
        )
      )
    : 100
  return { stageIndex, stage, progress }
}

const ORDERS_KEY = 'cc_orders'

export function useOrders() {
  const orders = useState<Order[]>('cc_orders', () => [])
  const loaded = useState<boolean>('cc_orders_loaded', () => false)

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

  function record(lines: OrderLine[], total: number, address: OrderAddress, payment: PaymentMethod): Order {
    const order: Order = {
      id: Math.random().toString(36).slice(2, 8).toUpperCase(),
      placedAt: new Date().toISOString(),
      lines,
      total,
      address,
      payment
    }
    orders.value = [order, ...orders.value]
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders.value))
    return order
  }

  return { orders, load, record }
}
