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
