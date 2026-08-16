<script setup lang="ts">
const { currentUser, logout } = useAuth()
const { count, load } = useCart()
const route = useRoute()
const cartOpen = ref(false)
const mobileOpen = ref(false)

onMounted(() => load())

watch(
  () => route.path,
  () => {
    mobileOpen.value = false
  }
)

const navLinks = [
  { to: '/', label: 'Menu' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/about', label: 'Kitchen' },
  { to: '/locations', label: 'Locations' },
  { to: '/orders', label: 'Order History' }
]

function doLogout() {
  mobileOpen.value = false
  logout()
  navigateTo('/login', { replace: true })
}
</script>

<template>
  <header class="sticky top-0 z-40">
    <PromoBar v-if="currentUser" />

    <div class="border-b border-charcoal/10 bg-paper/95 backdrop-blur">
      <div class="mx-auto max-w-6xl px-5 sm:px-8 flex items-center justify-between h-20">
        <NuxtLink to="/" class="flex items-center gap-3 group shrink-0">
          <span class="w-9 h-9 rounded-full bg-charcoal flex items-center justify-center">
            <span class="w-3.5 h-3.5 rounded-full bg-flame group-hover:bg-ember transition-colors"></span>
          </span>
          <span class="font-display font-extrabold text-xl tracking-tight leading-none">Burger Shop</span>
        </NuxtLink>

        <nav v-if="currentUser" class="hidden lg:flex items-center gap-1 font-mono text-xs uppercase tracking-widest2">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-4 py-2 rounded-full transition-colors"
            :class="route.path === link.to ? 'bg-charcoal text-paper' : 'text-charcoal/70 hover:bg-charcoal/5 hover:text-charcoal'"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div v-if="currentUser" class="flex items-center gap-3">
          <button
            class="relative w-10 h-10 flex items-center justify-center border border-charcoal/20 rounded-full hover:border-charcoal transition-colors"
            aria-label="View cart"
            @click="cartOpen = true"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-2.3 4.6A1 1 0 0 0 5.6 19H17M17 19a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM9 19a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/></svg>
            <span v-if="count > 0" class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-flame text-paper text-[10px] font-mono flex items-center justify-center">{{ count }}</span>
          </button>

          <NuxtLink to="/profile" class="hidden lg:flex items-center gap-2.5 group pl-1" aria-label="Your profile">
            <img
              :src="currentUser.avatar || '/images/avatar-default.svg'"
              alt=""
              class="w-9 h-9 rounded-full object-cover border-2 transition-colors"
              :class="route.path === '/profile' ? 'border-flame' : 'border-transparent group-hover:border-charcoal/30'"
            />
          </NuxtLink>

          <button
            class="lg:hidden w-10 h-10 flex items-center justify-center border border-charcoal/20 rounded-full"
            aria-label="Open menu"
            @click="mobileOpen = true"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>

          <button class="hidden lg:block text-[11px] font-mono uppercase text-smoke hover:text-flame transition-colors" @click="doLogout">Sign out</button>
        </div>
      </div>
    </div>

    <!-- Mobile drawer -->
    <Teleport to="body">
      <div v-if="mobileOpen" class="fixed inset-0 z-50 lg:hidden">
        <div class="absolute inset-0 bg-charcoal/50" @click="mobileOpen = false"></div>
        <aside class="absolute right-0 top-0 h-full w-full max-w-xs bg-paper border-l border-charcoal/15 flex flex-col shadow-2xl">
          <div class="flex items-center justify-between px-6 h-20 border-b border-charcoal/10">
            <span class="font-display font-extrabold text-xl">Menu</span>
            <button class="w-9 h-9 flex items-center justify-center" aria-label="Close menu" @click="mobileOpen = false">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
            </button>
          </div>
          <div class="flex items-center gap-3 px-6 py-6 border-b border-charcoal/10">
            <img :src="currentUser?.avatar || '/images/avatar-default.svg'" alt="" class="w-11 h-11 rounded-full object-cover" />
            <div>
              <p class="font-semibold text-sm">{{ currentUser?.name }}</p>
              <NuxtLink to="/profile" class="text-xs font-mono uppercase text-flame">View profile</NuxtLink>
            </div>
          </div>
          <nav class="flex flex-col px-3 py-4 font-mono text-sm uppercase tracking-widest2">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="px-3 py-3 rounded-lg transition-colors"
              :class="route.path === link.to ? 'bg-charcoal text-paper' : 'text-charcoal/70 hover:bg-charcoal/5'"
            >
              {{ link.label }}
            </NuxtLink>
            <NuxtLink to="/contact" class="px-3 py-3 rounded-lg transition-colors text-charcoal/70 hover:bg-charcoal/5">Contact</NuxtLink>
          </nav>
          <div class="mt-auto px-6 py-6 border-t border-charcoal/10">
            <button class="btn-outline w-full" @click="doLogout">Sign out</button>
          </div>
        </aside>
      </div>
    </Teleport>

    <!-- Cart drawer -->
    <Teleport to="body">
      <div v-if="cartOpen" class="fixed inset-0 z-50">
        <div class="absolute inset-0 bg-charcoal/50" @click="cartOpen = false"></div>
        <CartDrawer @close="cartOpen = false" />
      </div>
    </Teleport>
  </header>
</template>
