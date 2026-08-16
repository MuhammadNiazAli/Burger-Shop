<script setup lang="ts">
const { currentUser, updateProfile, changePassword, logout } = useAuth()

const nameInput = ref(currentUser.value?.name ?? '')
const nameSaved = ref(false)
const nameError = ref('')

const avatarError = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const passwordError = ref('')
const passwordSaved = ref(false)

watch(
  () => currentUser.value?.name,
  (val) => {
    if (val !== undefined) nameInput.value = val
  }
)

function saveName() {
  nameError.value = ''
  nameSaved.value = false
  const result = updateProfile({ name: nameInput.value })
  if (!result.ok) {
    nameError.value = result.error || 'Could not update your name.'
    return
  }
  nameSaved.value = true
  setTimeout(() => (nameSaved.value = false), 2200)
}

function triggerAvatarPick() {
  fileInput.value?.click()
}

function handleAvatarChange(event: Event) {
  avatarError.value = ''
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    avatarError.value = 'Please choose an image file.'
    return
  }
  if (file.size > 1.5 * 1024 * 1024) {
    avatarError.value = 'Please choose an image under 1.5MB.'
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    updateProfile({ avatar: reader.result as string })
  }
  reader.onerror = () => {
    avatarError.value = 'Could not read that file. Please try another image.'
  }
  reader.readAsDataURL(file)
}

function removeAvatar() {
  updateProfile({ avatar: null })
}

function savePassword() {
  passwordError.value = ''
  passwordSaved.value = false
  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = 'New password and confirmation do not match.'
    return
  }
  const result = changePassword(currentPassword.value, newPassword.value)
  if (!result.ok) {
    passwordError.value = result.error || 'Could not update your password.'
    return
  }
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  passwordSaved.value = true
  setTimeout(() => (passwordSaved.value = false), 2200)
}

function doLogout() {
  logout()
  navigateTo('/login', { replace: true })
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-5 sm:px-8 pt-16 pb-24 sm:pt-24">
    <span class="eyebrow">Your account</span>
    <h1 class="font-display font-extrabold text-5xl sm:text-6xl mt-4 mb-12 leading-[1.05]">Profile</h1>

    <!-- Avatar -->
    <section class="ticket p-8 mb-8">
      <h2 class="font-display font-bold text-xl mb-6">Profile photo</h2>
      <div class="flex items-center gap-6">
        <img
          :src="currentUser?.avatar || '/images/avatar-default.svg'"
          alt="Your avatar"
          class="w-24 h-24 rounded-full object-cover border border-charcoal/10"
        />
        <div class="flex flex-col gap-3">
          <div class="flex gap-3">
            <button class="btn-outline" @click="triggerAvatarPick">Upload photo</button>
            <button
              v-if="currentUser?.avatar"
              class="text-sm font-medium text-smoke hover:text-flame transition-colors"
              @click="removeAvatar"
            >
              Remove
            </button>
          </div>
          <p class="text-xs text-smoke">JPG or PNG, under 1.5MB.</p>
          <p v-if="avatarError" class="text-flame text-sm font-medium">{{ avatarError }}</p>
        </div>
        <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleAvatarChange" />
      </div>
    </section>

    <!-- Name -->
    <section class="ticket p-8 mb-8">
      <h2 class="font-display font-bold text-xl mb-6">Your details</h2>
      <form class="space-y-6" @submit.prevent="saveName">
        <div>
          <label for="profile-name" class="block text-xs font-mono uppercase tracking-widest2 text-smoke mb-2">Full name</label>
          <input id="profile-name" v-model="nameInput" type="text" class="field" required />
        </div>
        <div>
          <label class="block text-xs font-mono uppercase tracking-widest2 text-smoke mb-2">Email</label>
          <p class="py-3 text-charcoal/60">{{ currentUser?.email }}</p>
        </div>
        <p v-if="nameError" class="text-flame text-sm font-medium">{{ nameError }}</p>
        <p v-if="nameSaved" class="text-basil text-sm font-medium">Saved.</p>
        <button type="submit" class="btn-primary">Save changes</button>
      </form>
    </section>

    <!-- Password -->
    <section class="ticket p-8 mb-8">
      <h2 class="font-display font-bold text-xl mb-6">Change password</h2>
      <form class="space-y-6" @submit.prevent="savePassword">
        <div>
          <label for="current-password" class="block text-xs font-mono uppercase tracking-widest2 text-smoke mb-2">Current password</label>
          <input id="current-password" v-model="currentPassword" type="password" class="field" autocomplete="current-password" required />
        </div>
        <div>
          <label for="new-password" class="block text-xs font-mono uppercase tracking-widest2 text-smoke mb-2">New password</label>
          <input id="new-password" v-model="newPassword" type="password" class="field" autocomplete="new-password" required />
        </div>
        <div>
          <label for="confirm-password" class="block text-xs font-mono uppercase tracking-widest2 text-smoke mb-2">Confirm new password</label>
          <input id="confirm-password" v-model="confirmPassword" type="password" class="field" autocomplete="new-password" required />
        </div>
        <p v-if="passwordError" class="text-flame text-sm font-medium">{{ passwordError }}</p>
        <p v-if="passwordSaved" class="text-basil text-sm font-medium">Password updated.</p>
        <button type="submit" class="btn-primary">Update password</button>
      </form>
    </section>

    <!-- Sign out -->
    <section class="flex items-center justify-between border-t border-charcoal/10 pt-8">
      <p class="text-sm text-smoke max-w-sm">Signing out clears your session on this browser. Your account and orders stay saved for next time.</p>
      <button class="btn-outline shrink-0" @click="doLogout">Sign out</button>
    </section>
  </div>
</template>
