// Strict client-side auth gate. Only /login and /signup are reachable without
// a session. Every other route, including direct URL entry, a refresh, or the
// browser back/forward buttons, is re-checked on every navigation. Once a
// session exists, /login and /signup themselves become unreachable until the
// person explicitly logs out. `replace: true` is used throughout so the
// gated route never sits in browser history to flash back into view.
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const { currentUser, ready, init } = useAuth()
  if (!ready.value) init()

  const publicPages = ['/login', '/signup']
  const isPublic = publicPages.includes(to.path)

  if (!currentUser.value && !isPublic) {
    return navigateTo(
      { path: '/signup', query: { redirect: to.fullPath !== '/' ? to.fullPath : undefined } },
      { replace: true }
    )
  }

  if (currentUser.value && isPublic) {
    return navigateTo('/', { replace: true })
  }
})
