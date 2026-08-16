<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-charcoal text-paper mt-24">
    <div class="mx-auto max-w-6xl px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-3">
      <div>
        <p class="font-display font-extrabold text-2xl tracking-tight mb-3">Burger Shop</p>
        <p class="text-sm text-paper/60 max-w-xs">Fire-grilled burgers and wood-fired pizza, built on an open flame since day one.</p>
      </div>
      <div class="font-mono text-xs uppercase tracking-widest2 text-paper/50">
        <p class="text-paper mb-3 tracking-wide">Kitchen Hours</p>
        <p class="mb-1 normal-case font-body text-sm text-paper/70">Mon to Fri, 11:00 to 22:00</p>
        <p class="normal-case font-body text-sm text-paper/70">Sat to Sun, 12:00 to 23:00</p>
      </div>
      <div class="font-mono text-xs uppercase tracking-widest2 text-paper/50">
        <p class="text-paper mb-3 tracking-wide">Find Us</p>
        <p class="mb-1 normal-case font-body text-sm text-paper/70">14 Ember Street, Grillside</p>
        <p class="normal-case font-body text-sm text-paper/70">hello@burgershop.example</p>
      </div>
    </div>
    <div class="border-t border-paper/10 py-5 text-center text-[11px] font-mono text-paper/40 uppercase tracking-widest2">
      &copy; {{ year }} Burger Shop. All rights reserved.
    </div>
  </footer>
</template>
