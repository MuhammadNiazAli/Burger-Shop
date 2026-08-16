<script setup lang="ts">
import { menu } from '~/data/menu'

const { ids, load } = useFavorites()
onMounted(() => load())

const items = computed(() => menu.filter((m) => ids.value.includes(m.id)))
</script>

<template>
  <div class="mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-24 sm:pt-24">
    <span class="eyebrow">Saved for later</span>
    <h1 class="font-display font-extrabold text-5xl sm:text-6xl mt-4 mb-10 leading-[1.05]">Your favorites.</h1>

    <div v-if="items.length === 0" class="ticket p-10 text-center">
      <p class="text-charcoal/60 text-sm">Nothing saved yet. Tap the heart on any item to keep it here.</p>
      <NuxtLink to="/" class="btn-outline mt-6 inline-flex">Browse menu</NuxtLink>
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <MenuCard v-for="item in items" :key="item.id" :item="item" />
    </div>
  </div>
</template>
