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
  <article class="ticket pt-6 pb-5 px-5 flex flex-col h-full">
    <div class="bg-paper rounded-md mb-4 flex items-center justify-center h-36 overflow-hidden">
      <img :src="item.image" :alt="item.name" class="h-28 w-28 object-contain" />
    </div>
    <div class="flex items-start justify-between gap-3 mb-2">
      <h3 class="font-display font-bold text-xl tracking-tight leading-tight">{{ item.name }}</h3>
      <span class="font-mono text-sm shrink-0 pt-0.5">${{ item.price.toFixed(2) }}</span>
    </div>
    <span v-if="item.tag" class="eyebrow mb-2">{{ item.tag }}</span>
    <p class="text-sm text-charcoal/70 leading-relaxed flex-1">{{ item.desc }}</p>
    <button
      class="mt-4 self-start font-mono text-xs uppercase tracking-widest2 border-b-2 border-flame pb-0.5 hover:text-flame transition-colors"
      @click="handleAdd"
    >
      {{ justAdded ? 'Added ✓' : '+ Add to ticket' }}
    </button>
  </article>
</template>
