<script setup lang="ts">
import { menu, categories } from '~/data/menu'

const { currentUser } = useAuth()
const activeCategory = ref<typeof categories[number]>('Burgers')

const filtered = computed(() => menu.filter((m) => m.category === activeCategory.value))
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-charcoal text-paper">
      <div class="absolute inset-0 bg-grain"></div>
      <div class="relative mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <span class="eyebrow text-ember">Welcome back, {{ currentUser?.name.split(' ')[0] }}</span>
        <h1 class="font-display text-6xl sm:text-8xl leading-[0.9] mt-4 max-w-3xl">
          Cooked over<br /><span class="text-flame">open flame.</span>
        </h1>
        <p class="text-paper/70 text-base sm:text-lg max-w-md mt-6 leading-relaxed">
          Smash-pressed burgers and wood-fired pizza, char-marked to order. Pick a
          category below and build your ticket.
        </p>
        <a href="#menu" class="btn-primary mt-9">View the menu</a>
      </div>
    </section>

    <!-- Category strip -->
    <section id="menu" class="sticky top-20 z-30 bg-paper/95 backdrop-blur border-b border-charcoal/10">
      <div class="mx-auto max-w-6xl px-5 sm:px-8 flex gap-8 overflow-x-auto py-5 font-mono text-xs uppercase tracking-widest2">
        <button
          v-for="cat in categories"
          :key="cat"
          class="whitespace-nowrap pb-1 border-b-2 transition-colors"
          :class="activeCategory === cat ? 'border-flame text-flame' : 'border-transparent text-charcoal/50 hover:text-charcoal'"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- Menu grid -->
    <section class="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MenuCard v-for="item in filtered" :key="item.id" :item="item" />
      </div>
    </section>

    <!-- Signature strip -->
    <section class="bg-charcoal text-paper py-16">
      <div class="mx-auto max-w-6xl px-5 sm:px-8 grid sm:grid-cols-3 gap-10">
        <div>
          <span class="font-display text-4xl text-flame">01</span>
          <p class="font-semibold mt-3 mb-2">Fire first</p>
          <p class="text-sm text-paper/60 leading-relaxed">Every patty and pie touches open flame before it touches a plate.</p>
        </div>
        <div>
          <span class="font-display text-4xl text-flame">02</span>
          <p class="font-semibold mt-3 mb-2">Made to ticket</p>
          <p class="text-sm text-paper/60 leading-relaxed">Nothing's pre-made — your order goes straight to the grill.</p>
        </div>
        <div>
          <span class="font-display text-4xl text-flame">03</span>
          <p class="font-semibold mt-3 mb-2">Local, mostly</p>
          <p class="text-sm text-paper/60 leading-relaxed">Produce sourced from growers within a day's drive, whenever we can.</p>
        </div>
      </div>
    </section>
  </div>
</template>
