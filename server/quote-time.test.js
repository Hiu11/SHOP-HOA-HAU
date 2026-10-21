import test from 'node:test'
import assert from 'node:assert/strict'
import { quoteTimeSlots, validQuoteTime, quoteTimeLabel } from '../shared/quote-time.js'
import { validateQuote, today } from './quotes.js'
import { formatZaloRequest } from '../src/zalo-request.js'

const base = () => ({ name: 'Khách thử', phone: '0912345678', flowerType: 'Hoa hướng dương', quantity: 1, date: today(), location: '80/12 Hồ Thị Kỷ, Phường Vườn Lài, TP.HCM', note: '' })
test('quote preferences support the whole day at 15-minute intervals and flexible contact', () => {
  assert.equal(quoteTimeSlots.length, 96)
  assert.equal(quoteTimeSlots[0], '00:00')
  assert.equal(quoteTimeSlots.at(-1), '23:45')
  for (const value of ['now', 'anytime', ...quoteTimeSlots]) {
    assert.ok(validQuoteTime(value))
    assert.equal(validateQuote({ ...base(), quoteTime: value }).quoteTime, value)
  }
  for (const value of ['', '8:00', '24:00', '08:16', '23:59', undefined]) assert.throws(() => validateQuote({ ...base(), quoteTime: value }))
})
test('Zalo fallback retains the chosen contact time', () => {
  assert.equal(quoteTimeLabel('now'), 'Ngay bây giờ')
  assert.equal(quoteTimeLabel('anytime'), 'Bất cứ lúc nào')
  assert.ok(formatZaloRequest({ ...base(), quoteTime: '08:15' }).includes('Thời gian nhận báo giá: 08:15 (giờ Việt Nam)'))
})
