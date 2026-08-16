<script setup lang="ts"></script>

<template>
  <div>
    <section class="mx-auto max-w-4xl px-5 sm:px-8 pt-16 pb-10 sm:pt-24">
      <span class="eyebrow">Our kitchen</span>
      <h1 class="font-display font-extrabold text-5xl sm:text-6xl mt-4 mb-8 leading-[1.05] [text-wrap:balance]">Built around one grill.</h1>
      <p class="font-accent italic text-charcoal/70 leading-relaxed text-xl max-w-2xl">
        Burger Shop started as a single charcoal grill and a wood fired oven parked outside on weekends.
      </p>
      <p class="text-charcoal/70 leading-relaxed text-lg max-w-2xl mt-4">
        The menu grew and the crowd grew, but the flame stayed the same. Every burger is smash-pressed to order.
        Every pizza goes into the oven only once someone has asked for it.
      </p>
    </section>

    <section class="mx-auto max-w-4xl px-5 sm:px-8 py-10 grid sm:grid-cols-2 gap-8">
      <div class="ticket p-6 flex gap-5 items-start">
        <img src="/images/burger.svg" alt="" class="w-16 h-16 shrink-0" />
        <div>
          <span class="eyebrow mb-2 block">The grill</span>
          <p class="text-sm text-charcoal/70 leading-relaxed">Hardwood charcoal, no gas. It runs hotter and gives every patty its char in under two minutes a side.</p>
        </div>
      </div>
      <div class="ticket p-6 flex gap-5 items-start">
        <img src="/images/pizza.svg" alt="" class="w-16 h-16 shrink-0" />
        <div>
          <span class="eyebrow mb-2 block">The oven</span>
          <p class="text-sm text-charcoal/70 leading-relaxed">A wood fired deck oven at 430 degrees. Pizzas are in and out in ninety seconds, with a blistered crust that never goes soggy.</p>
        </div>
      </div>
      <div class="ticket p-6 flex gap-5 items-start">
        <img src="/images/sides.svg" alt="" class="w-16 h-16 shrink-0" />
        <div>
          <span class="eyebrow mb-2 block">The dough</span>
          <p class="text-sm text-charcoal/70 leading-relaxed">Cold-proofed for 48 hours for a slower fermentation, a better crumb, and a crust that holds its shape.</p>
        </div>
      </div>
      <div class="ticket p-6 flex gap-5 items-start">
        <img src="/images/drink.svg" alt="" class="w-16 h-16 shrink-0" />
        <div>
          <span class="eyebrow mb-2 block">The drinks</span>
          <p class="text-sm text-charcoal/70 leading-relaxed">Everything is made fresh in house, from the lemonade to the shakes, never from a syrup gun.</p>
        </div>
      </div>
    </section>
  </div>
</template>
