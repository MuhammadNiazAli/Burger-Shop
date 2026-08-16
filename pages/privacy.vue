<script setup lang="ts">
const sections = [
  {
    title: 'What we store',
    body: 'Your account (name, email, password), cart, order history, and favorites are saved only in your browser\'s local storage under this site\'s domain. None of it is sent to a server or shared with a third party.'
  },
  {
    title: 'Menu photography',
    body: 'Item photos are fetched live from public food photo APIs (Foodish and TheCocktailDB) when you browse the menu. Those requests go directly from your browser to those services, the same as loading any external image.'
  },
  {
    title: 'What we don\'t do',
    body: 'We don\'t use analytics trackers, advertising cookies, or sell any data — there\'s no backend collecting it in the first place.'
  },
  {
    title: 'Clearing your data',
    body: 'Clearing your browser\'s site data for this app, or using a different browser or device, removes your account, cart, orders, and favorites completely and permanently.'
  }
]
</script>

<template>
  <div class="mx-auto max-w-3xl px-5 sm:px-8 pt-16 pb-24 sm:pt-24">
    <span class="eyebrow">Legal</span>
    <h1 class="font-display font-extrabold text-5xl sm:text-6xl mt-4 mb-4 leading-[1.05] [text-wrap:balance]">Privacy policy.</h1>
    <p class="font-accent italic text-charcoal/60 text-lg max-w-xl mb-12">Last updated August 2026.</p>

    <div class="space-y-10">
      <section v-for="s in sections" :key="s.title">
        <h2 class="font-display font-bold text-xl mb-3">{{ s.title }}</h2>
        <p class="text-sm text-charcoal/70 leading-relaxed">{{ s.body }}</p>
      </section>
    </div>
  </div>
</template>
