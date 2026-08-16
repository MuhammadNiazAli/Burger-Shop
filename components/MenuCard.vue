<script setup lang="ts">
import type { MenuItem } from '~/data/menu'

const props = defineProps<{ item: MenuItem }>()
const { add } = useCart()
const justAdded = ref(false)

function handleAdd() {
  add(props.item)
  justAdded.value = true
  setTimeout(() => (justAdded.value = false), 900)
}
</script>

<template>
  <article class="group bg-white border border-charcoal/10 rounded-xl overflow-hidden flex flex-col h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_-16px_rgba(28,23,18,0.25)] hover:border-charcoal/20">
    <div class="relative bg-[#F1ECDF] h-40 flex items-center justify-center overflow-hidden">
      <span v-if="item.tag" class="absolute top-3 left-3 bg-charcoal text-paper text-[10px] font-mono font-semibold uppercase tracking-widest2 px-2.5 py-1 rounded-full">
        {{ item.tag }}
      </span>
      <img :src="item.image" :alt="item.name" class="h-28 w-28 object-contain transition-transform duration-300 group-hover:scale-110" />
    </div>

    <div class="p-5 flex flex-col flex-1">
      <div class="flex items-start justify-between gap-3 mb-1.5">
        <h3 class="font-display font-bold text-lg tracking-tight leading-tight">{{ item.name }}</h3>
        <span class="font-mono font-semibold text-base shrink-0">${{ item.price.toFixed(2) }}</span>
      </div>

      <StarRating :rating="item.rating" :reviews="item.reviews" class="mb-3" />

      <p class="text-sm text-charcoal/60 leading-relaxed flex-1">{{ item.desc }}</p>

      <button
        class="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold uppercase tracking-wide font-mono transition-colors"
        :class="justAdded ? 'bg-basil text-paper' : 'bg-charcoal text-paper hover:bg-flame'"
        @click="handleAdd"
      >
        {{ justAdded ? 'Added to ticket' : 'Add to ticket' }}
      </button>
    </div>
  </article>
</template>
