const FAV_KEY = 'cc_favorites'

export function useFavorites() {
  const ids = useState<string[]>('cc_favorite_ids', () => [])
  const loaded = useState<boolean>('cc_favorites_loaded', () => false)

  function load() {
    if (import.meta.server || loaded.value) return
    try {
      const raw = localStorage.getItem(FAV_KEY)
      ids.value = raw ? JSON.parse(raw) : []
    } catch {
      ids.value = []
    }
    loaded.value = true
  }

  function persist() {
    if (import.meta.server) return
    localStorage.setItem(FAV_KEY, JSON.stringify(ids.value))
  }

  function isFavorite(id: string) {
    return ids.value.includes(id)
  }

  function toggle(id: string) {
    load()
    if (ids.value.includes(id)) {
      ids.value = ids.value.filter((x) => x !== id)
    } else {
      ids.value = [...ids.value, id]
    }
    persist()
  }

  return { ids, load, isFavorite, toggle }
}
