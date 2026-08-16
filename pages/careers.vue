<script setup lang="ts">
const roles = [
  {
    title: 'Grill Cook',
    location: 'Grillside · Full-time',
    desc: 'Run the charcoal line during service — smash-pressing patties to order and keeping the char consistent, ticket after ticket.'
  },
  {
    title: 'Pizzaiolo',
    location: 'Riverside Market · Full-time',
    desc: 'Shape, top, and fire wood-oven pizzas at 430°, with an eye for a blistered crust that never goes soggy in transit.'
  },
  {
    title: 'Shift Lead',
    location: 'Northgate Yard · Full-time',
    desc: 'Own a service block front to back — staffing, ticket times, and quality checks on every plate that leaves the kitchen.'
  },
  {
    title: 'Delivery Rider',
    location: 'All locations · Part-time',
    desc: 'Get hot food to the door fast. Flexible shifts, your own vehicle, paid per delivery plus tips.'
  },
  {
    title: 'Frontend Engineer',
    location: 'Remote · Full-time',
    desc: 'Build and ship the ordering experience — cart, checkout, live order tracking — the stuff that keeps the kitchen busy.'
  }
]

const perks = [
  'Free shift meal, every shift',
  'Health coverage after 60 days',
  'Paid time off that actually gets used',
  'Referral bonus for kitchen and rider roles'
]
</script>

<template>
  <div class="mx-auto max-w-5xl px-5 sm:px-8 pt-16 pb-24 sm:pt-24">
    <span class="eyebrow">Join the kitchen</span>
    <h1 class="font-display font-extrabold text-5xl sm:text-6xl mt-4 mb-4 leading-[1.05] [text-wrap:balance]">Work where the flame is.</h1>
    <p class="font-accent italic text-charcoal/60 text-lg max-w-xl mb-12">
      We hire people who care about the char on a patty as much as we do. No corporate script, just good food and a fair shift.
    </p>

    <div class="grid lg:grid-cols-[1.3fr_1fr] gap-12">
      <div class="space-y-4">
        <div v-for="role in roles" :key="role.title" class="ticket p-6">
          <div class="flex items-start justify-between gap-4 mb-2">
            <h2 class="font-display font-bold text-xl">{{ role.title }}</h2>
            <span class="font-mono text-[11px] uppercase tracking-widest2 text-flame shrink-0 pt-1">{{ role.location }}</span>
          </div>
          <p class="text-sm text-charcoal/70 leading-relaxed">{{ role.desc }}</p>
          <NuxtLink to="/contact" class="inline-flex items-center gap-1.5 mt-4 text-xs font-mono uppercase tracking-widest2 text-charcoal hover:text-flame transition-colors">
            Apply via contact form
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </NuxtLink>
        </div>
      </div>

      <div class="ticket p-6 h-fit">
        <span class="eyebrow mb-3 block">Why work here</span>
        <ul class="space-y-3">
          <li v-for="perk in perks" :key="perk" class="flex items-start gap-2.5 text-sm text-charcoal/70">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mt-0.5 shrink-0 text-basil"><path d="M20 6L9 17l-5-5"/></svg>
            {{ perk }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
