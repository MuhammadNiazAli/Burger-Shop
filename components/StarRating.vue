<script setup lang="ts">
defineProps<{ rating: number; reviews?: number; size?: 'sm' | 'md' }>()
</script>

<template>
  <div class="flex items-center gap-1.5">
    <div class="flex items-center gap-0.5" :class="size === 'md' ? 'text-base' : 'text-xs'">
      <svg v-for="n in 5" :key="n" width="13" height="13" viewBox="0 0 20 20" :fill="n <= Math.round(rating) ? '#E3A008' : '#E4DFD3'">
        <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L1.3 7.7l6.1-.6L10 1.5z" />
      </svg>
    </div>
    <span class="text-xs font-semibold text-charcoal/70">{{ rating.toFixed(1) }}</span>
    <span v-if="reviews" class="text-xs text-smoke">({{ reviews.toLocaleString() }})</span>
  </div>
</template>
