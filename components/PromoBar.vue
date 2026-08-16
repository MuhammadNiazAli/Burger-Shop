<script setup lang="ts">
const messages = [
  'Free delivery on orders over $25',
  'Order before 9pm for same day pickup',
  'New: Smoky Mac & Cheese just dropped'
]
</script>

<template>
  <div class="bg-charcoal text-paper/80 text-xs font-mono uppercase tracking-widest2 overflow-hidden">
    <div class="mx-auto max-w-6xl px-5 sm:px-8 h-9 flex items-center justify-center gap-10">
      <span v-for="(msg, i) in messages" :key="i" class="hidden sm:inline-flex items-center gap-2 whitespace-nowrap">
        <span class="w-1 h-1 rounded-full bg-ember" />
        {{ msg }}
      </span>
      <span class="sm:hidden whitespace-nowrap">{{ messages[0] }}</span>
    </div>
  </div>
</template>
