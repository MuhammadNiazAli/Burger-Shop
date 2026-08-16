<script setup lang="ts">
const { state, settle } = useConfirm()

function onKeydown(e: KeyboardEvent) {
  if (!state.value.open) return
  if (e.key === 'Escape') settle(false)
  if (e.key === 'Enter') settle(true)
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="confirm-backdrop">
      <div v-if="state.open" class="fixed inset-0 z-[110] flex items-center justify-center px-5 bg-charcoal/55 backdrop-blur-sm" @click.self="settle(false)">
        <Transition name="confirm-pop" appear>
          <div v-if="state.open" class="ticket w-full max-w-sm p-7 shadow-2xl" role="alertdialog" aria-modal="true" :aria-label="state.title">
            <div
              class="w-11 h-11 rounded-full flex items-center justify-center mb-5"
              :class="state.tone === 'danger' ? 'bg-flame/10 text-flame' : 'bg-charcoal/10 text-charcoal'"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path v-if="state.tone === 'danger'" d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                <path v-else d="M12 16v-4M12 8h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
              </svg>
            </div>
            <h2 class="font-display font-bold text-xl mb-2 leading-snug">{{ state.title }}</h2>
            <p v-if="state.message" class="text-sm text-charcoal/60 leading-relaxed mb-7">{{ state.message }}</p>
            <div class="flex items-center gap-3">
              <button class="btn-outline flex-1 !py-2.5" @click="settle(false)">{{ state.cancelLabel }}</button>
              <button
                class="flex-1 rounded-lg py-2.5 text-sm font-semibold uppercase tracking-wide font-mono transition-all duration-150 active:scale-95"
                :class="state.tone === 'danger' ? 'bg-flame text-paper hover:bg-flame/90' : 'bg-charcoal text-paper hover:bg-charcoal/90'"
                @click="settle(true)"
              >
                {{ state.confirmLabel }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.confirm-backdrop-enter-active,
.confirm-backdrop-leave-active {
  transition: opacity 0.2s ease;
}
.confirm-backdrop-enter-from,
.confirm-backdrop-leave-to {
  opacity: 0;
}

.confirm-pop-enter-active {
  transition: opacity 0.22s cubic-bezier(0.22, 1, 0.36, 1), transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.confirm-pop-leave-active {
  transition: opacity 0.16s ease, transform 0.16s ease;
}
.confirm-pop-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}
.confirm-pop-leave-to {
  opacity: 0;
  transform: scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .confirm-backdrop-enter-active,
  .confirm-backdrop-leave-active,
  .confirm-pop-enter-active,
  .confirm-pop-leave-active {
    transition: none !important;
  }
}
</style>
