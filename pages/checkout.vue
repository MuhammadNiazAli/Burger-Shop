<script setup lang="ts">
import type { PaymentMethod } from '~/composables/useOrders'

const { lines, total, clear } = useCart()
const { record } = useOrders()

onMounted(() => {
  if (lines.value.length === 0) navigateTo('/', { replace: true })
})

const street = ref('')
const city = ref('')
const phone = ref('')
const payment = ref<PaymentMethod>('cod')
const placing = ref(false)
const error = ref('')

function handlePlaceOrder() {
  error.value = ''
  if (!street.value.trim() || !city.value.trim() || !phone.value.trim()) {
    error.value = 'Please fill in your delivery address and phone number.'
    return
  }
  placing.value = true
  const order = record(
    lines.value.map((l) => ({ id: l.id, name: l.name, qty: l.qty, price: l.price })),
    total.value,
    { street: street.value.trim(), city: city.value.trim(), phone: phone.value.trim() },
    payment.value
  )
  clear()
  navigateTo(`/orders?placed=${order.id}`, { replace: true })
}
</script>

<template>
  <div class="mx-auto max-w-5xl px-5 sm:px-8 pt-16 pb-24 sm:pt-24">
    <span class="eyebrow">Almost there</span>
    <h1 class="font-display font-extrabold text-5xl sm:text-6xl mt-4 mb-10 leading-[1.05] [text-wrap:balance]">Checkout.</h1>

    <div v-if="lines.length === 0" class="ticket p-10 text-center">
      <p class="text-charcoal/60 text-sm">Your ticket is empty.</p>
      <NuxtLink to="/" class="btn-outline mt-6 inline-flex">Browse menu</NuxtLink>
    </div>

    <div v-else class="grid lg:grid-cols-[1.1fr_1fr] gap-12">
      <form class="space-y-8" @submit.prevent="handlePlaceOrder">
        <section>
          <h2 class="font-display font-bold text-xl mb-6">Delivery address</h2>
          <div class="space-y-6">
            <div>
              <label for="street" class="block text-xs font-mono uppercase tracking-widest2 text-smoke mb-2">Street address</label>
              <input id="street" v-model="street" type="text" class="field" placeholder="123 Maple Avenue" required />
            </div>
            <div class="grid sm:grid-cols-2 gap-6">
              <div>
                <label for="city" class="block text-xs font-mono uppercase tracking-widest2 text-smoke mb-2">City</label>
                <input id="city" v-model="city" type="text" class="field" placeholder="Your city" required />
              </div>
              <div>
                <label for="phone" class="block text-xs font-mono uppercase tracking-widest2 text-smoke mb-2">Phone</label>
                <input id="phone" v-model="phone" type="tel" class="field" placeholder="For the delivery rider" required />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="font-display font-bold text-xl mb-6">Payment method</h2>
          <div class="grid sm:grid-cols-2 gap-4">
            <button
              type="button"
              class="ticket p-5 text-left transition-colors"
              :class="payment === 'cod' ? 'border-flame ring-1 ring-flame' : ''"
              @click="payment = 'cod'"
            >
              <p class="font-semibold text-sm mb-1">Cash on delivery</p>
              <p class="text-xs text-smoke">Pay the rider when your order arrives.</p>
            </button>
            <button
              type="button"
              class="ticket p-5 text-left transition-colors"
              :class="payment === 'card' ? 'border-flame ring-1 ring-flame' : ''"
              @click="payment = 'card'"
            >
              <p class="font-semibold text-sm mb-1">Card on file</p>
              <p class="text-xs text-smoke">Charged automatically once the kitchen confirms.</p>
            </button>
          </div>
        </section>

        <p v-if="error" class="text-flame text-sm font-medium">{{ error }}</p>

        <button type="submit" class="btn-primary w-full" :disabled="placing">
          {{ placing ? 'Firing order…' : `Place order · $${total.toFixed(2)}` }}
        </button>
      </form>

      <div class="ticket p-6 h-fit">
        <h2 class="font-display font-bold text-xl mb-6">Order summary</h2>
        <ul class="space-y-3 text-sm text-charcoal/70 mb-6">
          <li v-for="line in lines" :key="line.id" class="flex justify-between">
            <span>{{ line.qty }} × {{ line.name }}</span>
            <span class="font-mono">${{ (line.qty * line.price).toFixed(2) }}</span>
          </li>
        </ul>
        <div class="border-t border-charcoal/10 pt-4 flex items-center justify-between">
          <span class="font-mono text-xs uppercase tracking-widest2 text-smoke">Total</span>
          <span class="font-mono font-semibold text-lg">${{ total.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
