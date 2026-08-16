<script setup lang="ts">
import { orderStatus, ORDER_STAGES } from '~/composables/useOrders'
import { menu } from '~/data/menu'

const { orders, load } = useOrders()
const { add } = useCart()
const route = useRoute()
const toast = useToast()

onMounted(() => load())

// Tick every second so in-progress orders visibly move through their
// delivery stages without needing a page refresh.
const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  timer = setInterval(() => (now.value = Date.now()), 1000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function reorder(order: (typeof orders.value)[number]) {
  for (const line of order.lines) {
    const item = menu.find((m) => m.id === line.id)
    if (!item) continue
    for (let i = 0; i < line.qty; i++) add(item)
  }
  toast.success('Added to your ticket', `Ticket #${order.id} is back in your cart.`)
  navigateTo('/checkout')
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-5 sm:px-8 pt-16 pb-24 sm:pt-24">
    <span class="eyebrow">Past tickets</span>
    <h1 class="font-display font-extrabold text-5xl sm:text-6xl mt-4 mb-10 leading-[1.05]">Order history.</h1>

    <div v-if="orders.length === 0" class="ticket p-10 text-center">
      <p class="text-charcoal/60 text-sm">No orders fired yet. Head to the menu and build your first ticket.</p>
      <NuxtLink to="/" class="btn-outline mt-6 inline-flex">Browse menu</NuxtLink>
    </div>

    <ul v-else class="space-y-6">
      <li
        v-for="order in orders"
        :key="order.id"
        class="ticket p-6"
        :class="route.query.placed === order.id ? 'ring-1 ring-flame' : ''"
      >
        <div class="flex items-start justify-between mb-4 gap-4">
          <div>
            <p class="font-mono text-xs uppercase tracking-widest2 text-flame">Ticket #{{ order.id }}</p>
            <p class="text-sm text-charcoal/50 mt-1">{{ formatDate(order.placedAt) }}</p>
          </div>
          <p class="font-mono font-semibold shrink-0">${{ order.total.toFixed(2) }}</p>
        </div>

        <!-- Live delivery tracker -->
        <div class="mb-5">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-semibold" :class="orderStatus(order.placedAt, now).stageIndex === 3 ? 'text-basil' : 'text-flame'">
              {{ orderStatus(order.placedAt, now).stage.label }}
            </span>
            <span class="text-xs text-smoke font-mono">Step {{ orderStatus(order.placedAt, now).stageIndex + 1 }} / {{ ORDER_STAGES.length }}</span>
          </div>
          <div class="flex gap-1.5">
            <div
              v-for="(stg, i) in ORDER_STAGES"
              :key="stg.key"
              class="h-1.5 flex-1 rounded-full transition-colors duration-500"
              :class="i <= orderStatus(order.placedAt, now).stageIndex ? 'bg-flame' : 'bg-charcoal/10'"
            />
          </div>
        </div>

        <ul class="text-sm text-charcoal/70 space-y-1 mb-5">
          <li v-for="(line, i) in order.lines" :key="i" class="flex justify-between">
            <span>{{ line.qty }} × {{ line.name }}</span>
            <span class="font-mono">${{ (line.qty * line.price).toFixed(2) }}</span>
          </li>
        </ul>

        <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-charcoal/10 text-xs text-smoke">
          <div class="space-y-0.5">
            <p>{{ order.address.street }}, {{ order.address.city }}</p>
            <p>{{ order.payment === 'cod' ? 'Cash on delivery' : 'Card on file' }} · {{ order.address.phone }}</p>
          </div>
          <button class="btn-outline !px-4 !py-2 shrink-0" @click="reorder(order)">Reorder</button>
        </div>
      </li>
    </ul>
  </div>
</template>
