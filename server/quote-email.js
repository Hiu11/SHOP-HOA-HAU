export const quoteRecipient = 'tronghieudo2k4@gmail.com'

// Enable only after the owner approves FormSubmit and activates the recipient.
export function emailEnabled() {
  return process.env.QUOTE_EMAIL_PROVIDER === 'formsubmit'
}

export async function notifyQuote(quote, { enabled = emailEnabled(), request = fetch } = {}) {
  if (!enabled) return 'disabled'
  const [year, month, day] = quote.date.split('-')
  const response = await request(`https://formsubmit.co/ajax/${quoteRecipient}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', Referer: 'https://shop-hoa-hau.vercel.app/' },
    signal: AbortSignal.timeout(8000),
    body: JSON.stringify({
      _subject: `SHOP HOA HẬU — Yêu cầu báo giá ${quote.id}`,
      _template: 'table',
      _url: 'https://shop-hoa-hau.vercel.app/',
      'Mã yêu cầu': quote.id,
      'Họ tên': quote.name,
      'Số điện thoại': quote.phone,
      'Loại hoa': quote.flowerType,
      'Số lượng': `${quote.quantity} bó`,
      'Ngày nhận': `${day}/${month}/${year}`,
      'Địa chỉ giao': quote.location,
      'Ghi chú': quote.note || 'Không có',
      'Thời gian': quote.createdAt
    })
  })
  if (!response.ok) throw new Error('Email provider unavailable')
  const result = await response.json()
  if (result.success !== true && result.success !== 'true') throw new Error('Email provider rejected request')
  // Provider acceptance is not proof of delivery to the Gmail inbox.
  return 'accepted'
}
