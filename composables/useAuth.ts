// Fully client-side auth. Users are stored in localStorage under "cc_users".
// The active session is stored under "cc_session".
// NOTE: this is intentionally NOT secure (plaintext, no backend) — it exists
// purely to gate the frontend as requested. Do not reuse this pattern for
// anything that handles real user data.

interface StoredUser {
  name: string
  email: string
  password: string
  createdAt: string
}

interface SessionUser {
  name: string
  email: string
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
      return { ok: false, error: 'Fill in every field — password needs at least 4 characters.' }
    }
    const users = readUsers()
    if (users.some((u) => u.email === cleanEmail)) {
      return { ok: false, error: 'An account already exists for that email. Try logging in instead.' }
    }
    users.push({ name: name.trim(), email: cleanEmail, password, createdAt: new Date().toISOString() })
    writeUsers(users)
    const session: SessionUser = { name: name.trim(), email: cleanEmail }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    currentUser.value = session
    return { ok: true }
  }

  function login(email: string, password: string): { ok: boolean; error?: string } {
    const cleanEmail = email.trim().toLowerCase()
    const users = readUsers()
    const found = users.find((u) => u.email === cleanEmail && u.password === password)
    if (!found) {
      return { ok: false, error: 'No account matches that email and password.' }
    }
    const session: SessionUser = { name: found.name, email: found.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    currentUser.value = session
    return { ok: true }
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    currentUser.value = null
  }

  return { currentUser, ready, init, signup, login, logout }
}
