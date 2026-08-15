<script setup lang="ts">
const { orders, load } = useOrders()
onMounted(() => load())

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-5 sm:px-8 pt-16 pb-24 sm:pt-24">
    <span class="eyebrow">Past tickets</span>
    <h1 class="font-display text-5xl sm:text-6xl mt-4 mb-10 leading-[0.95]">Order history.</h1>

    <div v-if="orders.length === 0" class="ticket p-10 text-center">
      <p class="text-charcoal/60 text-sm">No orders fired yet — head to the menu and build your first ticket.</p>
      <NuxtLink to="/" class="btn-outline mt-6 inline-flex">Browse menu</NuxtLink>
    </div>

    <ul v-else class="space-y-6">
      <li v-for="order in orders" :key="order.id" class="ticket p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <p class="font-mono text-xs uppercase tracking-widest2 text-flame">Ticket #{{ order.id }}</p>
            <p class="text-sm text-charcoal/50 mt-1">{{ formatDate(order.placedAt) }}</p>
          </div>
          <p class="font-mono font-semibold">${{ order.total.toFixed(2) }}</p>
        </div>
        <ul class="text-sm text-charcoal/70 space-y-1">
          <li v-for="(line, i) in order.lines" :key="i" class="flex justify-between">
            <span>{{ line.qty }} × {{ line.name }}</span>
            <span class="font-mono">${{ (line.qty * line.price).toFixed(2) }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
