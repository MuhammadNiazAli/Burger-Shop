import type { MenuItem } from '~/data/menu'

interface CartLine {
  id: string
  name: string
  price: number
  qty: number
}

const CART_KEY = 'cc_cart'

export function useCart() {
  const lines = useState<CartLine[]>('cc_cart_lines', () => [])
  const loaded = useState<boolean>('cc_cart_loaded', () => false)

  function persist() {
    if (import.meta.server) return
    localStorage.setItem(CART_KEY, JSON.stringify(lines.value))
  }

  function load() {
    if (import.meta.server || loaded.value) return
    try {
      const raw = localStorage.getItem(CART_KEY)
      lines.value = raw ? JSON.parse(raw) : []
    } catch {
      lines.value = []
    }
    loaded.value = true
  }

  function add(item: MenuItem) {
    const existing = lines.value.find((l) => l.id === item.id)
    if (existing) {
      existing.qty++
    } else {
      lines.value.push({ id: item.id, name: item.name, price: item.price, qty: 1 })
    }
    persist()
  }

  function decrease(id: string) {
    const existing = lines.value.find((l) => l.id === id)
    if (!existing) return
    existing.qty--
    if (existing.qty <= 0) {
      lines.value = lines.value.filter((l) => l.id !== id)
    }
    persist()
  }

  function remove(id: string) {
    lines.value = lines.value.filter((l) => l.id !== id)
    persist()
  }

  function clear() {
    lines.value = []
    persist()
  }

  const count = computed(() => lines.value.reduce((sum, l) => sum + l.qty, 0))
  const total = computed(() => lines.value.reduce((sum, l) => sum + l.qty * l.price, 0))

  return { lines, load, add, decrease, remove, clear, count, total }
}
