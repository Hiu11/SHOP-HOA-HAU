import { quoteTimeLabel } from '../shared/quote-time.js'

export const quoteRecipient = 'dntanh16w@gmail.com'

// Enable only after the owner approves FormSubmit and activates the recipient.
export function emailEnabled() {
  return process.env.QUOTE_EMAIL_PROVIDER === 'formsubmit'
}

export function prepareQuoteEmail(quote) {
  const [year, month, day] = quote.date.split('-')
  return {
    url: `https://formsubmit.co/ajax/${quoteRecipient}`,
    payload: {
      _subject: `SHOP HOA HẬU — Yêu cầu báo giá ${quote.id}`,
      _template: 'table',
      _url: 'https://shop-hoa-hau.vercel.app/',
      'Mã yêu cầu': quote.id,
      'Họ tên': quote.name,
      'Số điện thoại': quote.phone,
      'Loại hoa': quote.flowerType,
      'Số lượng': `${quote.quantity} bó`,
      'Ngày nhận': `${day}/${month}/${year}`,
      'Thời gian nhận báo giá': quoteTimeLabel(quote.quoteTime),
      'Địa chỉ giao': quote.location,
      'Ghi chú': quote.note || 'Không có',
      'Thời gian': quote.createdAt
    }
  }
}

export async function notifyQuote(quote, { enabled = emailEnabled(), request = fetch, browserDelivery = Boolean(process.env.VERCEL) } = {}) {
  if (!enabled) return 'disabled'
  // FormSubmit supports browser AJAX; its service rejects this Vercel server's IP.
  if (browserDelivery) return 'client_required'
  const delivery = prepareQuoteEmail(quote)
  const response = await request(delivery.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', Referer: 'https://shop-hoa-hau.vercel.app/' },
    signal: AbortSignal.timeout(15000),
    body: JSON.stringify(delivery.payload)
  })
  if (!response.ok) throw new Error(`Email provider HTTP ${response.status}`)
  const result = await response.json()
  if (result.success !== true && result.success !== 'true') {
    const reason = /activation/i.test(result.message ?? '') ? 'activation_required' : /web server/i.test(result.message ?? '') ? 'website_referrer_required' : 'provider_rejected'
    throw new Error(`Email provider: ${reason}`)
  }
  // Provider acceptance is not proof of delivery to the Gmail inbox.
  return 'accepted'
}
