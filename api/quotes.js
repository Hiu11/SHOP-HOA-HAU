import { validateQuote } from '../server/quotes.js'
import { notifyQuote } from '../server/quote-email.js'

async function saveToBlob(quote) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('Quote storage not configured')
  const { put } = await import('@vercel/blob')
  await put(`quotes/${quote.id}.json`, JSON.stringify(quote), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: false
  })
}

// Vercel parses JSON request bodies. Keep storage injectable for offline tests.
export function createQuoteHandler({ saveQuote = saveToBlob, sendNotification = notifyQuote } = {}) {
  return async (req, res) => {
    res.setHeader('Cache-Control', 'no-store')
    const send = (status, data) => res.status(status).json(data)
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return send(405, { error: 'Phương thức không được hỗ trợ.' })
    }
    if (!req.headers['content-type']?.startsWith('application/json')) return send(415, { error: 'Yêu cầu cần ở định dạng JSON.' })
    let quote
    try {
      const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
      if (!body) return send(400, { error: 'Nội dung yêu cầu không hợp lệ.' })
      if (Buffer.byteLength(body) > 16384) return send(413, { error: 'Nội dung yêu cầu quá dài.' })
      quote = validateQuote(JSON.parse(body))
    } catch (error) {
      return send(400, { error: error instanceof SyntaxError ? 'Nội dung yêu cầu không hợp lệ.' : error.message })
    }
    try {
      await saveQuote(quote)
      let notification
      try { notification = await sendNotification(quote) }
      catch (error) {
        console.error('Quote email notification failed:', error.name, error.message)
        notification = 'failed'
      }
      return send(201, { id: quote.id, createdAt: quote.createdAt, notification })
    } catch {
      return send(503, { error: 'Chưa lưu được yêu cầu. Vui lòng thử lại hoặc liên hệ Zalo 0798971155.' })
    }
  }
}

export default createQuoteHandler()
