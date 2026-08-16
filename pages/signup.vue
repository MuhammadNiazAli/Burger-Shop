<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { signup } = useAuth()
const route = useRoute()

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

function handleSubmit() {
  error.value = ''
  loading.value = true
  const result = signup(name.value, email.value, password.value)
  loading.value = false
  if (!result.ok) {
    error.value = result.error || 'Something went wrong.'
    return
  }
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
  navigateTo(redirect, { replace: true })
}
</script>

<template>
  <div class="min-h-[calc(100vh-80px)] grid lg:grid-cols-2">
    <!-- Left: brand panel -->
    <div class="hidden lg:flex flex-col justify-between bg-charcoal text-paper px-14 py-14 relative overflow-hidden">
      <div class="absolute inset-0 bg-grain"></div>
      <img src="/images/flame-mark.svg" alt="" class="absolute -right-24 -bottom-16 w-96 opacity-20 pointer-events-none" />
      <div class="relative">
        <span class="eyebrow text-ember">Table for one?</span>
        <h1 class="font-display font-extrabold text-6xl xl:text-7xl leading-[1.05] mt-5 [text-wrap:balance]">
          First, open a <span class="text-flame">tab.</span>
        </h1>
      </div>
      <p class="relative font-accent italic text-paper/70 text-lg max-w-md leading-relaxed">
        Every seat in the house starts with a ticket. Create your account and the full menu is yours to order from.
      </p>
    </div>

    <!-- Right: form -->
    <div class="flex items-center justify-center px-6 py-16 sm:py-24">
      <div class="w-full max-w-sm">
        <span class="eyebrow">New here</span>
        <h2 class="font-display font-extrabold text-4xl mt-2 mb-8">Create your account</h2>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="name" class="sr-only">Full name</label>
            <input id="name" v-model="name" type="text" placeholder="Full name" class="field" autocomplete="name" required />
          </div>
          <div>
            <label for="email" class="sr-only">Email</label>
            <input id="email" v-model="email" type="email" placeholder="Email address" class="field" autocomplete="email" required />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" v-model="password" type="password" placeholder="Password (min 4 characters)" class="field" autocomplete="new-password" required />
          </div>

          <p v-if="error" class="text-flame text-sm font-medium">{{ error }}</p>

          <button type="submit" class="btn-primary w-full" :disabled="loading">
            {{ loading ? 'Opening tab…' : 'Sign up & enter' }}
          </button>
        </form>

        <p class="text-sm text-smoke mt-8">
          Already have a tab open?
          <NuxtLink to="/login" class="text-charcoal font-semibold hover:text-flame transition-colors">Log in</NuxtLink>
        </p>

        <p class="text-xs text-smoke/70 mt-10 leading-relaxed">
          This demo stores your account in your browser's local storage only. It lives on this device and this browser, with no server involved.
        </p>
      </div>
    </div>
  </div>
</template>
