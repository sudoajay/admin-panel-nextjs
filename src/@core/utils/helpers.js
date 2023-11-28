export function setThemeMode(mode) {
  localStorage.setItem(process.env.settingsCache, JSON.stringify({ ThemeMode: mode }))
}

export function getThemeMode() {
  return JSON.parse(localStorage.getItem(process.env.settingsCache))
}

// export function setAuth(sessionID) {
//   sessionStorage.setItem('Auth', JSON.stringify({ SessionID: sessionID }))
// }

// export function getAuth() {
//   return JSON.parse(sessionStorage.getItem('Auth'))
// }
