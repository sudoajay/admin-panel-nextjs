export function setThemeMode(mode) {
  localStorage.setItem(process.env.settingsCache, JSON.stringify({ ThemeMode: mode }))
}

export function getThemeMode() {
  return JSON.parse(localStorage.getItem(process.env.settingsCache))
}
