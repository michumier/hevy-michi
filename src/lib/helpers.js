export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

export function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

export function formatDuration(sec) {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  if (h > 0) return `${h}h ${m}m`
  return `${m}m ${s}s`
}

export function formatPace(pace) {
  const min = Math.floor(pace)
  const sec = Math.round((pace - min) * 60)
  return `${min}:${sec.toString().padStart(2, '0')} /km`
}

export function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr + 'T12:00:00').getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return 'HACE MENOS DE 1 HORA'
  if (hours < 24) return `HACE ${hours} HORAS`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'AYER'
  return `HACE ${days} DÍAS`
}

export function getWeekNumber(date) {
  const d = new Date(date + 'T12:00:00')
  const startOfYear = new Date(d.getFullYear(), 0, 1)
  const diff = d - startOfYear + (startOfYear.getTimezoneOffset() - d.getTimezoneOffset()) * 60000
  return Math.ceil((diff / 86400000 + startOfYear.getDay() + 1) / 7)
}

export function getWeekLabel(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  const week = getWeekNumber(d)
  return `S${week}`
}

export function todayStr() {
  return new Date().toISOString().split('T')[0]
}
