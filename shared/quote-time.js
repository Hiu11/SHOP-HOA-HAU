export const quoteTimeSlots = Array.from({ length: 96 }, (_, index) => `${String(Math.floor(index / 4)).padStart(2, '0')}:${String(index % 4 * 15).padStart(2, '0')}`)
export const validQuoteTime = value => ['now', 'anytime', ...quoteTimeSlots].includes(value)
export function quoteTimeLabel(value) {
  if (value === 'now') return 'Ngay bây giờ'
  if (value === 'anytime' || !value) return 'Bất cứ lúc nào'
  return `${value} (giờ Việt Nam)`
}
