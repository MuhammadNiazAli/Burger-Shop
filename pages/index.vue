<script setup lang="ts">
import { menu, categories } from '~/data/menu'

const { currentUser } = useAuth()
const activeCategory = ref<typeof categories[number]>('Burgers')

const filtered = computed(() => menu.filter((m) => m.category === activeCategory.value))
const featured = computed(() => menu.filter((m) => m.tag === 'Signature'))
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-charcoal text-paper">
      <div class="absolute inset-0 bg-grain"></div>
      <img src="/images/flame-mark.svg" alt="" class="absolute -right-16 -top-10 w-80 md:w-[26rem] opacity-15 pointer-events-none" />
      <div class="relative mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <span class="eyebrow text-ember">Welcome back, {{ currentUser?.name.split(' ')[0] }}</span>
        <h1 class="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl leading-[1.05] mt-5 max-w-3xl [text-wrap:balance]">
          Cooked over open <span class="text-flame">flame.</span>
        </h1>
        <p class="font-accent italic text-paper/70 text-lg sm:text-xl max-w-md mt-6 leading-relaxed">
          Smash-pressed burgers and wood-fired pizza, char-marked to order.
        </p>
        <a href="#menu" class="btn-primary mt-9">View the menu</a>
      </div>
    </section>

    <!-- Featured strip -->
    <section class="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-16">
      <span class="eyebrow">Fan favourites</span>
      <h2 class="font-display font-extrabold text-3xl sm:text-4xl mt-2 mb-8">Where to start</h2>
      <div class="grid sm:grid-cols-3 gap-6">
        <div v-for="item in featured" :key="item.id" class="flex flex-col items-center text-center">
          <div class="w-full aspect-square bg-charcoal/[0.04] rounded-2xl flex items-center justify-center mb-4">
            <img :src="item.image" :alt="item.name" class="w-2/3 h-2/3 object-contain" />
          </div>
          <p class="font-display font-bold text-lg">{{ item.name }}</p>
          <p class="text-sm text-charcoal/60 mt-1 max-w-xs">{{ item.desc }}</p>
        </div>
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
          <span class="font-display font-extrabold text-4xl text-flame">01</span>
          <p class="font-semibold mt-3 mb-2">Fire first</p>
          <p class="text-sm text-paper/60 leading-relaxed">Every patty and pie touches open flame before it touches a plate.</p>
        </div>
        <div>
          <span class="font-display font-extrabold text-4xl text-flame">02</span>
          <p class="font-semibold mt-3 mb-2">Made to ticket</p>
          <p class="text-sm text-paper/60 leading-relaxed">Nothing is pre-made. Your order goes straight to the grill the moment you send it.</p>
        </div>
        <div>
          <span class="font-display font-extrabold text-4xl text-flame">03</span>
          <p class="font-semibold mt-3 mb-2">Local, mostly</p>
          <p class="text-sm text-paper/60 leading-relaxed">Produce sourced from growers within a day's drive, whenever we can.</p>
        </div>
      </div>
    </section>
  </div>
</template>
