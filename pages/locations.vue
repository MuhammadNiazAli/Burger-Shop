<script setup lang="ts">
const branches = [
  {
    name: 'Grillside',
    address: '14 Ember Street, Grillside',
    hours: 'Mon to Sun, 11:00 to 23:00',
    phone: '+1 (555) 014 2200',
    flagship: true
  },
  {
    name: 'Riverside Market',
    address: '58 Riverside Market, Downtown',
    hours: 'Mon to Sun, 12:00 to 22:00',
    phone: '+1 (555) 014 2244'
  },
  {
    name: 'Northgate Yard',
    address: '210 Northgate Yard, Uptown',
    hours: 'Tue to Sun, 12:00 to 22:30',
    phone: '+1 (555) 014 2277'
  }
]
</script>

<template>
  <div class="mx-auto max-w-5xl px-5 sm:px-8 pt-16 pb-24 sm:pt-24">
    <span class="eyebrow">Find us</span>
    <h1 class="font-display font-extrabold text-5xl sm:text-6xl mt-4 mb-4 leading-[1.05] [text-wrap:balance]">Three grills, one flame.</h1>
    <p class="font-accent italic text-charcoal/60 text-lg max-w-xl mb-12">
      Every location runs the same charcoal grill and wood-fired oven as the original.
    </p>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="branch in branches" :key="branch.name" class="ticket p-6 flex flex-col">
        <span v-if="branch.flagship" class="eyebrow mb-2">Flagship</span>
        <h2 class="font-display font-bold text-xl mb-3">{{ branch.name }}</h2>
        <div class="space-y-2 text-sm text-charcoal/70">
          <p class="flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mt-0.5 shrink-0 text-flame"><path d="M12 22s-8-7.5-8-13a8 8 0 1 1 16 0c0 5.5-8 13-8 13Z"/><circle cx="12" cy="9" r="2.5"/></svg>
            {{ branch.address }}
          </p>
          <p class="flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mt-0.5 shrink-0 text-flame"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
            {{ branch.hours }}
          </p>
          <p class="flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mt-0.5 shrink-0 text-flame"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8.1 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.9 2.2Z"/></svg>
            {{ branch.phone }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
