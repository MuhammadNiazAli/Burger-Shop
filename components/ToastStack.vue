<script setup lang="ts">
const { toasts, dismiss } = useToast()

const ICONS: Record<string, string> = {
  success: 'M20 6L9 17l-5-5',
  error: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z',
  info: 'M12 16v-4M12 8h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z'
}

const ACCENT: Record<string, string> = {
  success: 'border-l-basil text-basil',
  error: 'border-l-flame text-flame',
  info: 'border-l-ember text-ember'
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed z-[100] bottom-5 right-5 left-5 sm:left-auto flex flex-col-reverse gap-3 sm:w-96 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="t in toasts"
          :key="t.id"
          class="toast-card pointer-events-auto ticket border-l-4 shadow-[0_16px_32px_-12px_rgba(28,23,18,0.35)] px-4 py-3.5 flex items-start gap-3 relative overflow-hidden"
          :class="ACCENT[t.type]"
        >
          <span class="mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-current/10">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path :d="ICONS[t.type]" />
            </svg>
          </span>
          <div class="min-w-0 flex-1 pr-2">
            <p class="font-semibold text-sm text-charcoal leading-snug">{{ t.title }}</p>
            <p v-if="t.message" class="text-xs text-charcoal/60 mt-0.5 leading-relaxed">{{ t.message }}</p>
          </div>
          <button
            class="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-charcoal/30 hover:text-charcoal hover:bg-charcoal/5 transition-colors"
            aria-label="Dismiss notification"
            @click="dismiss(t.id)"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
          <span class="toast-timer absolute bottom-0 left-0 h-[3px] bg-current/25" :style="{ animationDuration: t.duration + 'ms' }" />
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-card {
  background: #fffdf8;
}

.toast-timer {
  animation-name: toast-shrink;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes toast-shrink {
  from { width: 100%; }
  to { width: 0%; }
}

.toast-enter-active {
  transition: opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1), transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}
.toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  position: absolute;
  width: 100%;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(24px) scale(0.97);
}
.toast-move {
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active,
  .toast-move {
    transition: none !important;
  }
  .toast-timer {
    animation: none !important;
  }
}
</style>
