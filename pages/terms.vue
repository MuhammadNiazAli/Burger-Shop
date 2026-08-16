<script setup lang="ts">
const sections = [
  {
    title: '1. Using this app',
    body: 'This is a demo ordering experience. Creating an account, browsing the menu, and placing orders all run entirely in your browser — there is no real payment processing and no food is actually delivered.'
  },
  {
    title: '2. Your account',
    body: 'Account details you enter are stored only in this browser\'s local storage. Clearing your browser data or switching devices will remove your account and order history. Keep that in mind before relying on it.'
  },
  {
    title: '3. Orders and pricing',
    body: 'Menu items, prices, and order statuses shown here are for demonstration purposes. Placing an order simulates a delivery timeline but does not charge any payment method or dispatch any rider.'
  },
  {
    title: '4. Acceptable use',
    body: 'Please don\'t use this app to submit harmful, abusive, or illegal content through the contact or account forms. We reserve the right to remove access for misuse.'
  },
  {
    title: '5. Changes to these terms',
    body: 'We may update these terms as the demo evolves. Continued use after a change means you accept the updated terms.'
  }
]
</script>

<template>
  <div class="mx-auto max-w-3xl px-5 sm:px-8 pt-16 pb-24 sm:pt-24">
    <span class="eyebrow">Legal</span>
    <h1 class="font-display font-extrabold text-5xl sm:text-6xl mt-4 mb-4 leading-[1.05] [text-wrap:balance]">Terms of service.</h1>
    <p class="font-accent italic text-charcoal/60 text-lg max-w-xl mb-12">Last updated August 2026.</p>

    <div class="space-y-10">
      <section v-for="s in sections" :key="s.title">
        <h2 class="font-display font-bold text-xl mb-3">{{ s.title }}</h2>
        <p class="text-sm text-charcoal/70 leading-relaxed">{{ s.body }}</p>
      </section>
    </div>
  </div>
</template>
