interface StoredUser {
  name: string
  email: string
  password: string
  avatar: string | null
  createdAt: string
}

interface SessionUser {
  name: string
  email: string
  avatar: string | null
}

const USERS_KEY = 'cc_users'
const SESSION_KEY = 'cc_session'

function readUsers(): StoredUser[] {
  if (import.meta.server) return []
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? (JSON.parse(raw) as StoredUser[]) : []
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function useAuth() {
  const currentUser = useState<SessionUser | null>('cc_current_user', () => null)
  const ready = useState<boolean>('cc_auth_ready', () => false)

  function persistSession(session: SessionUser) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    currentUser.value = session
  }

  function init() {
    if (import.meta.server || ready.value) return
    try {
      const raw = localStorage.getItem(SESSION_KEY)
      currentUser.value = raw ? (JSON.parse(raw) as SessionUser) : null
    } catch {
      currentUser.value = null
    }
    ready.value = true
  }

  function signup(name: string, email: string, password: string): { ok: boolean; error?: string } {
    const cleanEmail = email.trim().toLowerCase()
    if (!name.trim() || !cleanEmail || password.length < 4) {
      return { ok: false, error: 'Fill in every field. Password needs at least 4 characters.' }
    }
    const users = readUsers()
    if (users.some((u) => u.email === cleanEmail)) {
      return { ok: false, error: 'An account already exists for that email. Try logging in instead.' }
    }
    users.push({ name: name.trim(), email: cleanEmail, password, avatar: null, createdAt: new Date().toISOString() })
    writeUsers(users)
    persistSession({ name: name.trim(), email: cleanEmail, avatar: null })
    return { ok: true }
  }

  function login(email: string, password: string): { ok: boolean; error?: string } {
    const cleanEmail = email.trim().toLowerCase()
    const users = readUsers()
    const found = users.find((u) => u.email === cleanEmail && u.password === password)
    if (!found) {
      return { ok: false, error: 'No account matches that email and password.' }
    }
    persistSession({ name: found.name, email: found.email, avatar: found.avatar })
    return { ok: true }
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    currentUser.value = null
  }

  function updateProfile(updates: { name?: string; avatar?: string | null }): { ok: boolean; error?: string } {
    if (!currentUser.value) return { ok: false, error: 'You need to be logged in.' }
    const cleanName = updates.name?.trim()
    if (updates.name !== undefined && !cleanName) {
      return { ok: false, error: 'Name cannot be empty.' }
    }
    const users = readUsers()
    const idx = users.findIndex((u) => u.email === currentUser.value!.email)
    if (idx === -1) return { ok: false, error: 'Account not found.' }

    if (cleanName) users[idx].name = cleanName
    if (updates.avatar !== undefined) users[idx].avatar = updates.avatar
    writeUsers(users)

    persistSession({
      name: users[idx].name,
      email: users[idx].email,
      avatar: users[idx].avatar
    })
    return { ok: true }
  }

  function changePassword(currentPassword: string, newPassword: string): { ok: boolean; error?: string } {
    if (!currentUser.value) return { ok: false, error: 'You need to be logged in.' }
    if (newPassword.length < 4) return { ok: false, error: 'New password needs at least 4 characters.' }
    const users = readUsers()
    const idx = users.findIndex((u) => u.email === currentUser.value!.email)
    if (idx === -1) return { ok: false, error: 'Account not found.' }
    if (users[idx].password !== currentPassword) {
      return { ok: false, error: 'Current password is incorrect.' }
    }
    users[idx].password = newPassword
    writeUsers(users)
    return { ok: true }
  }

  return { currentUser, ready, init, signup, login, logout, updateProfile, changePassword }
}
