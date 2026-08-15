<script setup lang="ts">
const { currentUser, logout } = useAuth()
const { count, load } = useCart()
const route = useRoute()
const menuOpen = ref(false)
const cartOpen = ref(false)

onMounted(() => load())

function doLogout() {
  logout()
  navigateTo('/login')
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-charcoal/10 bg-paper/95 backdrop-blur">
    <div class="mx-auto max-w-6xl px-5 sm:px-8 flex items-center justify-between h-20">
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <span class="w-9 h-9 rounded-full bg-charcoal flex items-center justify-center">
          <span class="w-3.5 h-3.5 rounded-full bg-flame group-hover:bg-ember transition-colors"></span>
        </span>
        <span class="font-display text-2xl tracking-wide leading-none">Char&nbsp;&amp;&nbsp;Crust</span>
      </NuxtLink>

      <nav v-if="currentUser" class="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest2">
        <NuxtLink to="/" class="hover:text-flame transition-colors" :class="route.path === '/' ? 'text-flame' : 'text-charcoal/70'">Menu</NuxtLink>
        <NuxtLink to="/about" class="hover:text-flame transition-colors" :class="route.path === '/about' ? 'text-flame' : 'text-charcoal/70'">Kitchen</NuxtLink>
        <NuxtLink to="/orders" class="hover:text-flame transition-colors" :class="route.path === '/orders' ? 'text-flame' : 'text-charcoal/70'">Order History</NuxtLink>
      </nav>

      <div v-if="currentUser" class="flex items-center gap-4">
        <button
          class="relative w-10 h-10 flex items-center justify-center border border-charcoal/20 hover:border-charcoal transition-colors"
          aria-label="View cart"
          @click="cartOpen = true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-2.3 4.6A1 1 0 0 0 5.6 19H17M17 19a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM9 19a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/></svg>
          <span v-if="count > 0" class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-flame text-paper text-[10px] font-mono flex items-center justify-center">{{ count }}</span>
        </button>
        <div class="hidden sm:flex flex-col items-end leading-tight">
          <span class="text-sm font-semibold">{{ currentUser.name.split(' ')[0] }}</span>
          <button class="text-[11px] font-mono uppercase text-smoke hover:text-flame transition-colors" @click="doLogout">Sign out</button>
        </div>
        <button class="sm:hidden text-xs font-mono uppercase text-smoke" @click="doLogout">Exit</button>
      </div>
    </div>

    <!-- Cart drawer -->
    <Teleport to="body">
      <div v-if="cartOpen" class="fixed inset-0 z-50">
        <div class="absolute inset-0 bg-charcoal/50" @click="cartOpen = false"></div>
        <CartDrawer @close="cartOpen = false" />
      </div>
    </Teleport>
  </header>
</template>
