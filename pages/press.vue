<script setup lang="ts">
const mentions = [
  {
    outlet: 'City Eats Weekly',
    title: 'The smash burger that finally earned its char',
    date: 'March 2026'
  },
  {
    outlet: 'Grillside Gazette',
    title: 'How a weekend charcoal stand became three storefronts',
    date: 'November 2025'
  },
  {
    outlet: 'Downtown Bites',
    title: 'Wood-fired pizza worth the wait, delivered fast anyway',
    date: 'August 2025'
  }
]
</script>

<template>
  <div class="mx-auto max-w-4xl px-5 sm:px-8 pt-16 pb-24 sm:pt-24">
    <span class="eyebrow">Press</span>
    <h1 class="font-display font-extrabold text-5xl sm:text-6xl mt-4 mb-4 leading-[1.05] [text-wrap:balance]">In the papers.</h1>
    <p class="font-accent italic text-charcoal/60 text-lg max-w-xl mb-12">
      A few write-ups from local food press. For interviews or media assets, reach out through the contact page.
    </p>

    <ul class="space-y-4 mb-14">
      <li v-for="m in mentions" :key="m.title" class="ticket p-6 flex items-start justify-between gap-6">
        <div>
          <span class="font-mono text-[11px] uppercase tracking-widest2 text-flame">{{ m.outlet }}</span>
          <h2 class="font-display font-bold text-xl mt-1.5">{{ m.title }}</h2>
        </div>
        <span class="text-xs text-smoke font-mono shrink-0 pt-1">{{ m.date }}</span>
      </li>
    </ul>

    <div class="ticket p-8">
      <span class="eyebrow mb-2 block">Media kit</span>
      <p class="text-sm text-charcoal/70 leading-relaxed max-w-lg">
        Need logos, photography, or a quote from the kitchen? Send a note through
        <NuxtLink to="/contact" class="text-charcoal font-semibold hover:text-flame transition-colors">contact</NuxtLink>
        and we'll get back within a couple of days.
      </p>
    </div>
  </div>
</template>
