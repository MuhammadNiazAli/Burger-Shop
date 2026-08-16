<script setup lang="ts">
import type { MenuItem } from '~/data/menu'

const props = defineProps<{ item: MenuItem }>()
const { add } = useCart()
const { resolveImage } = useFoodImages()
const { isFavorite, toggle, load: loadFavorites } = useFavorites()
const toast = useToast()

const justAdded = ref(false)
const photo = ref<string | null>(null)
const photoLoading = ref(true)
const heartBounce = ref(false)

const cardEl = ref<HTMLElement | null>(null)

function handleTilt(e: PointerEvent) {
  if (!cardEl.value) return
  const rect = cardEl.value.getBoundingClientRect()
  const relX = (e.clientX - rect.left) / rect.width - 0.5
  const relY = (e.clientY - rect.top) / rect.height - 0.5
  cardEl.value.style.transform = `rotateX(${(-relY * 5).toFixed(2)}deg) rotateY(${(relX * 5).toFixed(2)}deg) translateY(-4px)`
}
function resetTilt() {
  if (!cardEl.value) return
  cardEl.value.style.transform = ''
}

onMounted(async () => {
  loadFavorites()
  photo.value = await resolveImage(props.item.id, props.item.category, props.item.image)
  photoLoading.value = false
})

function handleAdd() {
  add(props.item)
  justAdded.value = true
  toast.success('Added to your ticket', props.item.name)
  setTimeout(() => (justAdded.value = false), 900)
}

function handleToggleFavorite() {
  const wasFavorite = isFavorite(props.item.id)
  toggle(props.item.id)
  heartBounce.value = true
  setTimeout(() => (heartBounce.value = false), 400)
  if (wasFavorite) {
    toast.info('Removed from favorites', props.item.name)
  } else {
    toast.success('Saved to favorites', props.item.name)
  }
}
</script>

<template>
  <div class="tilt-wrap h-full">
  <article
    ref="cardEl"
    class="tilt-card group bg-white border border-charcoal/10 rounded-xl overflow-hidden flex flex-col h-full transition-shadow duration-200 hover:shadow-[0_20px_38px_-16px_rgba(28,23,18,0.3)] hover:border-charcoal/20"
    @pointermove="handleTilt"
    @pointerleave="resetTilt"
  >
    <div class="relative bg-[#F1ECDF] h-44 overflow-hidden shine">
      <span v-if="item.tag" class="absolute top-3 left-3 z-10 bg-charcoal text-paper text-[10px] font-mono font-semibold uppercase tracking-widest2 px-2.5 py-1 rounded-full">
        {{ item.tag }}
      </span>

      <button
        class="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-paper/90 backdrop-blur flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95"
        :aria-label="isFavorite(item.id) ? 'Remove from favorites' : 'Add to favorites'"
        @click="handleToggleFavorite"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" :fill="isFavorite(item.id) ? '#E3572A' : 'none'" stroke="currentColor" stroke-width="2" class="transition-colors" :class="[isFavorite(item.id) ? 'text-flame' : 'text-charcoal/50', heartBounce && 'heart-pop']">
          <path d="M20.8 8.6a5.5 5.5 0 0 0-9.4-3.9L12 5.3l-.6-.6A5.5 5.5 0 0 0 3.2 8.6c0 1.5.6 2.9 1.6 3.9l6.6 6.6a.9.9 0 0 0 1.3 0l6.6-6.6c1-1 1.6-2.4 1.6-3.9Z"/>
        </svg>
      </button>

      <div v-if="photoLoading" class="absolute inset-0 animate-pulse bg-charcoal/5"></div>
      <img
        v-else
        :src="photo || item.image"
        :alt="item.name"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        @error="photo = item.image"
      />
    </div>

    <div class="p-5 flex flex-col flex-1">
      <div class="flex items-start justify-between gap-3 mb-1.5">
        <h3 class="font-display font-bold text-lg tracking-tight leading-tight">{{ item.name }}</h3>
        <span class="font-mono font-semibold text-base shrink-0">${{ item.price.toFixed(2) }}</span>
      </div>

      <StarRating :rating="item.rating" :reviews="item.reviews" class="mb-3" />

      <p class="text-sm text-charcoal/60 leading-relaxed flex-1">{{ item.desc }}</p>

      <button
        class="ripple mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold uppercase tracking-wide font-mono transition-all duration-150 active:scale-[0.97]"
        :class="justAdded ? 'bg-basil text-paper' : 'bg-charcoal text-paper hover:bg-flame'"
        @click="handleAdd"
      >
        <svg v-if="justAdded" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" class="heart-pop"><path d="M20 6L9 17l-5-5"/></svg>
        {{ justAdded ? 'Added to ticket' : 'Add to ticket' }}
      </button>
    </div>
  </article>
  </div>
</template>
