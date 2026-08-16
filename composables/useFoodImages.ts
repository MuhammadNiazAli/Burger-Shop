type ImgCache = Record<string, string>

const CACHE_KEY = 'cc_img_cache_v1'

const FOODISH_CATEGORIES: Record<string, string[]> = {
  Burgers: ['burger'],
  Pizza: ['pizza'],
  Sides: ['samosa', 'sandwich', 'rice', 'pasta']
}

export function useFoodImages() {
  const cache = useState<ImgCache>('food_img_cache', () => ({}))
  const loaded = useState<boolean>('food_img_cache_loaded', () => false)

  function loadCache() {
    if (import.meta.server || loaded.value) return
    try {
      const raw = localStorage.getItem(CACHE_KEY)
      if (raw) cache.value = { ...JSON.parse(raw), ...cache.value }
    } catch {
    }
    loaded.value = true
  }

  function persist() {
    if (import.meta.server) return
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache.value))
    } catch {
    }
  }

  async function fetchFoodishImage(category: string): Promise<string | null> {
    try {
      const res = await fetch(`https://foodish-api.com/api/images/${category}`)
      if (!res.ok) throw new Error('bad response')
      const data = await res.json()
      return typeof data?.image === 'string' ? data.image : null
    } catch {
      return null
    }
  }

  async function fetchDrinkImage(): Promise<string | null> {
    try {
      const id = Math.floor(Math.random() * 500) + 1
      const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      if (!res.ok) throw new Error('bad response')
      const data = await res.json()
      const thumb = data?.drinks?.[0]?.strDrinkThumb
      return typeof thumb === 'string' ? `${thumb}/medium` : null
    } catch {
      return null
    }
  }

  async function resolveImage(itemId: string, category: string, fallback: string): Promise<string> {
    loadCache()
    if (cache.value[itemId]) return cache.value[itemId]

    let url: string | null = null
    if (category === 'Drinks') {
      url = await fetchDrinkImage()
    } else {
      const options = FOODISH_CATEGORIES[category] || ['burger']
      const pick = options[Math.floor(Math.random() * options.length)]
      url = await fetchFoodishImage(pick)
    }

    const final = url || fallback
    cache.value = { ...cache.value, [itemId]: final }
    persist()
    return final
  }

  return { cache, loadCache, resolveImage }
}
