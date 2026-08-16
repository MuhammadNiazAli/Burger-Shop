<script setup lang="ts">
const name = ref('')
const email = ref('')
const message = ref('')
const sent = ref(false)

function handleSubmit() {
  if (!name.value || !email.value || !message.value) return
  sent.value = true
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <div class="mx-auto max-w-5xl px-5 sm:px-8 pt-16 pb-24 sm:pt-24">
    <span class="eyebrow">Get in touch</span>
    <h1 class="font-display font-extrabold text-5xl sm:text-6xl mt-4 mb-4 leading-[1.05] [text-wrap:balance]">We would love to hear from you.</h1>
    <p class="font-accent italic text-charcoal/60 text-lg max-w-xl mb-12">
      Questions about an order, catering, or just want to say hello. Send us a note.
    </p>

    <div class="grid lg:grid-cols-[1.1fr_1fr] gap-12">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="contact-name" class="block text-xs font-mono uppercase tracking-widest2 text-smoke mb-2">Your name</label>
          <input id="contact-name" v-model="name" type="text" class="field" required />
        </div>
        <div>
          <label for="contact-email" class="block text-xs font-mono uppercase tracking-widest2 text-smoke mb-2">Email</label>
          <input id="contact-email" v-model="email" type="email" class="field" required />
        </div>
        <div>
          <label for="contact-message" class="block text-xs font-mono uppercase tracking-widest2 text-smoke mb-2">Message</label>
          <textarea id="contact-message" v-model="message" rows="5" class="field resize-none" required></textarea>
        </div>

        <p v-if="sent" class="text-basil text-sm font-medium">Thanks, your message is on its way to the kitchen.</p>

        <button type="submit" class="btn-primary">Send message</button>
      </form>

      <div class="space-y-6">
        <div class="ticket p-6">
          <span class="eyebrow mb-2 block">Call or email</span>
          <p class="text-sm text-charcoal/70 leading-relaxed">+1 (555) 014 2200</p>
          <p class="text-sm text-charcoal/70 leading-relaxed">hello@burgershop.example</p>
        </div>
        <div class="ticket p-6">
          <span class="eyebrow mb-2 block">Head office</span>
          <p class="text-sm text-charcoal/70 leading-relaxed">14 Ember Street, Grillside</p>
        </div>
        <div class="ticket p-6">
          <span class="eyebrow mb-2 block">Hours</span>
          <p class="text-sm text-charcoal/70 leading-relaxed">Mon to Fri, 11:00 to 22:00</p>
          <p class="text-sm text-charcoal/70 leading-relaxed">Sat to Sun, 12:00 to 23:00</p>
        </div>
      </div>
    </div>
  </div>
</template>
