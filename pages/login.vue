<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { login } = useAuth()
const route = useRoute()
const toast = useToast()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

function handleSubmit() {
  error.value = ''
  loading.value = true
  const result = login(email.value, password.value)
  loading.value = false
  if (!result.ok) {
    error.value = result.error || 'Something went wrong.'
    toast.error('Could not log in', error.value)
    return
  }
  toast.success('Welcome back!', 'The grill\'s still hot.')
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
  navigateTo(redirect, { replace: true })
}
</script>

<template>
  <div class="min-h-[calc(100vh-80px)] grid lg:grid-cols-2">
    <div class="flex items-center justify-center px-6 py-16 sm:py-24 order-2 lg:order-1">
      <div class="w-full max-w-sm">
        <span class="eyebrow">Welcome back</span>
        <h2 class="font-display font-extrabold text-4xl mt-2 mb-8">Log in to order</h2>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input id="email" v-model="email" type="email" placeholder="Email address" class="field" autocomplete="email" required />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" v-model="password" type="password" placeholder="Password" class="field" autocomplete="current-password" required />
          </div>

          <p v-if="error" class="text-flame text-sm font-medium">{{ error }}</p>

          <button type="submit" class="btn-primary w-full" :disabled="loading">
            {{ loading ? 'Checking…' : 'Log in' }}
          </button>
        </form>

        <p class="text-sm text-smoke mt-8">
          No account yet?
          <NuxtLink to="/signup" class="text-charcoal font-semibold hover:text-flame transition-colors">Sign up</NuxtLink>
        </p>
      </div>
    </div>

    <div class="hidden lg:flex flex-col justify-between bg-charcoal text-paper px-14 py-14 relative overflow-hidden order-1 lg:order-2">
      <div class="absolute inset-0 bg-grain"></div>
      <img src="/images/flame-mark.svg" alt="" class="absolute -right-24 -bottom-16 w-96 opacity-20 pointer-events-none" />
      <div class="relative">
        <span class="eyebrow text-ember">Back for more?</span>
        <h1 class="font-display font-extrabold text-6xl xl:text-7xl leading-[1.05] mt-5 [text-wrap:balance]">
          The grill's still <span class="text-flame">hot.</span>
        </h1>
      </div>
      <p class="relative font-accent italic text-paper/70 text-lg max-w-md leading-relaxed">
        Log back in to pick up where you left off, your ticket, your history, your table.
      </p>
    </div>
  </div>
</template>
