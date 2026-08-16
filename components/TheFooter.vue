<script setup lang="ts">
const toast = useToast()
const year = new Date().getFullYear()
const email = ref('')
const subscribed = ref(false)

function subscribe() {
  if (!email.value) return
  subscribed.value = true
  toast.success('You\'re on the list', 'Weekly specials land in your inbox from now on.')
  email.value = ''
  setTimeout(() => (subscribed.value = false), 3000)
}
</script>

<template>
  <footer class="bg-charcoal text-paper mt-24">
    <div class="mx-auto max-w-6xl px-5 sm:px-8 py-16 grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <span class="w-8 h-8 rounded-full bg-paper flex items-center justify-center">
            <span class="w-3 h-3 rounded-full bg-flame"></span>
          </span>
          <span class="font-display font-extrabold text-xl tracking-tight">Burger Shop</span>
        </div>
        <p class="text-sm text-paper/60 max-w-xs leading-relaxed">
          Fire-grilled burgers and wood-fired pizza, built on an open flame since day one.
        </p>
        <div class="flex items-center gap-3 mt-6">
          <a href="#" aria-label="Instagram" class="w-9 h-9 rounded-full border border-paper/20 flex items-center justify-center hover:border-ember hover:text-ember transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>
          </a>
          <a href="#" aria-label="Facebook" class="w-9 h-9 rounded-full border border-paper/20 flex items-center justify-center hover:border-ember hover:text-ember transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h3l1-3h-4V9c0-.6.4-1 1-1z"/></svg>
          </a>
          <a href="#" aria-label="X" class="w-9 h-9 rounded-full border border-paper/20 flex items-center justify-center hover:border-ember hover:text-ember transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4l16 16M20 4L4 20"/></svg>
          </a>
        </div>
      </div>

      <div class="font-mono text-xs uppercase tracking-widest2 text-paper/50">
        <p class="text-paper mb-4 tracking-wide">Explore</p>
        <ul class="space-y-3 normal-case font-body text-sm text-paper/70">
          <li><NuxtLink to="/" class="hover:text-ember transition-colors">Full menu</NuxtLink></li>
          <li><NuxtLink to="/favorites" class="hover:text-ember transition-colors">Favorites</NuxtLink></li>
          <li><NuxtLink to="/about" class="hover:text-ember transition-colors">Our kitchen</NuxtLink></li>
          <li><NuxtLink to="/locations" class="hover:text-ember transition-colors">Locations</NuxtLink></li>
          <li><NuxtLink to="/orders" class="hover:text-ember transition-colors">Order history</NuxtLink></li>
          <li><NuxtLink to="/contact" class="hover:text-ember transition-colors">Contact us</NuxtLink></li>
        </ul>
      </div>

      <div class="font-mono text-xs uppercase tracking-widest2 text-paper/50">
        <p class="text-paper mb-4 tracking-wide">Company</p>
        <ul class="space-y-3 normal-case font-body text-sm text-paper/70">
          <li><NuxtLink to="/careers" class="hover:text-ember transition-colors">Careers</NuxtLink></li>
          <li><NuxtLink to="/press" class="hover:text-ember transition-colors">Press</NuxtLink></li>
          <li><NuxtLink to="/terms" class="hover:text-ember transition-colors">Terms of service</NuxtLink></li>
          <li><NuxtLink to="/privacy" class="hover:text-ember transition-colors">Privacy policy</NuxtLink></li>
        </ul>
      </div>

      <div>
        <p class="font-mono text-xs uppercase tracking-widest2 text-paper mb-4 tracking-wide">Stay in the loop</p>
        <p class="text-sm text-paper/60 mb-4 leading-relaxed">New menu drops and weekly specials, straight to your inbox.</p>
        <form class="flex gap-2" @submit.prevent="subscribe">
          <input
            v-model="email"
            type="email"
            required
            placeholder="you@example.com"
            class="flex-1 min-w-0 bg-paper/10 border border-paper/20 rounded-lg px-3 py-2.5 text-sm text-paper placeholder:text-paper/40 focus:border-ember outline-none transition-colors"
          />
          <button type="submit" class="shrink-0 bg-ember text-charcoal font-mono font-semibold text-xs uppercase px-4 rounded-lg hover:bg-ember/90 transition-colors">
            Join
          </button>
        </form>
        <p v-if="subscribed" class="text-basil text-xs mt-2">Thanks, you're on the list.</p>
      </div>
    </div>

    <div class="border-t border-paper/10">
      <div class="mx-auto max-w-6xl px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-paper/40 uppercase tracking-widest2">
        <span>&copy; {{ year }} Burger Shop. All rights reserved.</span>
        <span class="normal-case">14 Ember Street, Grillside &middot; hello@burgershop.example</span>
      </div>
    </div>
  </footer>
</template>
