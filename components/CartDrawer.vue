<script setup lang="ts">
const emit = defineEmits(['close'])
const { lines, add, decrease, remove, clear, total } = useCart()
const { record } = useOrders()
const placed = ref(false)

function placeOrder() {
  if (lines.value.length === 0) return
  record(
    lines.value.map((l) => ({ name: l.name, qty: l.qty, price: l.price })),
    total.value
  )
  placed.value = true
  setTimeout(() => {
    clear()
    placed.value = false
    emit('close')
  }, 1800)
}
</script>

<template>
  <aside class="absolute right-0 top-0 h-full w-full max-w-sm bg-paper border-l border-charcoal/15 flex flex-col shadow-2xl">
    <div class="flex items-center justify-between px-6 h-20 border-b border-charcoal/10">
      <h2 class="font-display font-extrabold text-2xl tracking-tight">Your Ticket</h2>
      <button class="w-9 h-9 flex items-center justify-center hover:text-flame" aria-label="Close cart" @click="emit('close')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>

    <div class="flex-1 overflow-y-auto px-6 py-6">
      <div v-if="placed" class="text-center py-16">
        <p class="font-display font-extrabold text-3xl text-flame mb-2">Order Fired!</p>
        <p class="text-sm text-smoke">It's heading to the grill now.</p>
      </div>

      <div v-else-if="lines.length === 0" class="text-center py-16">
        <p class="text-smoke text-sm">Your ticket is empty. Add something from the menu.</p>
      </div>

      <ul v-else class="space-y-5">
        <li v-for="line in lines" :key="line.id" class="flex items-start justify-between gap-3">
          <div>
            <p class="font-semibold text-sm">{{ line.name }}</p>
            <p class="font-mono text-xs text-smoke mt-1">${{ line.price.toFixed(2) }} each</p>
          </div>
          <div class="flex items-center gap-3 font-mono text-sm">
            <button class="w-6 h-6 border border-charcoal/25 hover:border-flame hover:text-flame" @click="decrease(line.id)">−</button>
            <span class="w-4 text-center">{{ line.qty }}</span>
            <button class="w-6 h-6 border border-charcoal/25 hover:border-flame hover:text-flame" @click="add({ id: line.id, name: line.name, price: line.price } as any)">+</button>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="!placed" class="border-t border-charcoal/10 px-6 py-6">
      <div class="flex items-center justify-between font-mono text-sm mb-4">
        <span class="uppercase tracking-widest2 text-smoke">Total</span>
        <span class="text-lg font-semibold">${{ total.toFixed(2) }}</span>
      </div>
      <button class="btn-primary w-full" :disabled="lines.length === 0" :class="lines.length === 0 && 'opacity-40 cursor-not-allowed'" @click="placeOrder">
        Fire the Order
      </button>
    </div>
  </aside>
</template>
