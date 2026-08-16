export function spawnRipple(e: MouseEvent | PointerEvent) {
  if (import.meta.server) return
  const target = e.currentTarget as HTMLElement
  if (!target) return
  const rect = target.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height) * 1.8
  const dot = document.createElement('span')
  dot.className = 'ripple-dot'
  dot.style.width = `${size}px`
  dot.style.height = `${size}px`
  dot.style.left = `${e.clientX - rect.left - size / 2}px`
  dot.style.top = `${e.clientY - rect.top - size / 2}px`
  target.appendChild(dot)
  dot.addEventListener('animationend', () => dot.remove())
}

export function useMagnetic(strength = 10) {
  function onPointerMove(e: PointerEvent) {
    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    target.style.setProperty('--mx', `${relX * strength}px`)
    target.style.setProperty('--my', `${relY * strength}px`)
  }
  function onPointerLeave(e: PointerEvent) {
    const target = e.currentTarget as HTMLElement
    target.style.setProperty('--mx', '0px')
    target.style.setProperty('--my', '0px')
  }
  return { onPointerMove, onPointerLeave }
}

export function useCountUp(target: number, duration = 1200) {
  const display = ref(0)
  const el = ref<Element | null>(null)
  let done = false

  function run() {
    if (done || import.meta.server) return
    done = true
    const start = performance.now()
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      display.value = Math.round(target * eased * 10) / 10
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  onMounted(() => {
    if (!el.value) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) run()
      },
      { threshold: 0.4 }
    )
    observer.observe(el.value)
    onUnmounted(() => observer.disconnect())
  })

  return { display, el }
}
