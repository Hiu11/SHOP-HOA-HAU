import { randomUUID } from 'node:crypto'

import { flowerNames } from '../shared/catalog.js'
export { flowerNames }
export function today() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
}

export function validateQuote(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Thông tin yêu cầu không hợp lệ.')
  const fields = ['name', 'phone', 'flowerType', 'quantity', 'date', 'location', 'note']
  const data = Object.fromEntries(fields.map(key => [key, String(input[key] ?? '').trim()]))
  if (data.name.length < 2 || data.name.length > 100) throw new Error('Họ tên cần từ 2 đến 100 ký tự.')
  data.phone = data.phone.replace(/[\s.()-]/g, '')
  if (!/^(0\d{9}|\+84\d{9})$/.test(data.phone)) throw new Error('Vui lòng nhập số điện thoại Việt Nam hợp lệ.')
  if (!flowerNames.includes(data.flowerType)) throw new Error('Vui lòng chọn loại hoa.')
  data.quantity = Number(data.quantity)
  if (!Number.isInteger(data.quantity) || data.quantity < 1 || data.quantity > 100000) throw new Error('Số lượng cần là số nguyên từ 1 đến 100.000 bó.')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !Number.isFinite(Date.parse(data.date)) || new Date(data.date).toISOString().slice(0, 10) !== data.date || data.date < today()) throw new Error('Ngày nhận hoa phải hợp lệ và không trước hôm nay.')
  if (data.location.length < 5 || data.location.length > 600) throw new Error('Địa điểm giao cần từ 5 đến 600 ký tự.')
  if (data.note.length > 2000) throw new Error('Ghi chú tối đa 2.000 ký tự.')
  return { id: `BG-${randomUUID()}`, createdAt: new Date().toISOString(), status: 'new', ...data }
}
