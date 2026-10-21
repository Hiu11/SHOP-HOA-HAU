import { createServer } from 'node:http'
import { mkdir, appendFile, readFile } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateQuote } from './quotes.js'
import { emailEnabled, notifyQuote } from './quote-email.js'

const root = fileURLToPath(new URL('../dist/', import.meta.url))
const dataDir = fileURLToPath(new URL('../data/', import.meta.url))
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ttf': 'font/ttf', '.ico': 'image/x-icon' }
const json = (res, status, data) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)) }

export function createApp({ storageDirectory = dataDir, staticDirectory = root, sendNotification = notifyQuote } = {}) {
  return createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost')
    if (url.pathname === '/api/quote-config') {
      if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return json(res, 405, { error: 'Phương thức không được hỗ trợ.' }) }
      return json(res, 200, { emailEnabled: emailEnabled() })
    }
    if (url.pathname === '/api/quotes') {
      if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return json(res, 405, { error: 'Phương thức không được hỗ trợ.' }) }
      if (!req.headers['content-type']?.startsWith('application/json')) return json(res, 415, { error: 'Yêu cầu cần ở định dạng JSON.' })
      const chunks = []
      let bytes = 0
      try {
        for await (const chunk of req) {
          bytes += chunk.length
          if (bytes > 16384) return json(res, 413, { error: 'Nội dung yêu cầu quá dài.' })
          chunks.push(chunk)
        }
      } catch { return json(res, 400, { error: 'Không đọc được yêu cầu.' }) }
      let quote
      try { quote = validateQuote(JSON.parse(Buffer.concat(chunks).toString('utf8'))) } catch (error) { return json(res, 400, { error: error instanceof SyntaxError ? 'Nội dung yêu cầu không hợp lệ.' : error.message }) }
      try {
        await mkdir(storageDirectory, { recursive: true })
        await appendFile(resolve(storageDirectory, 'quotes.jsonl'), JSON.stringify(quote) + '\n', { encoding: 'utf8', mode: 0o600 })
        let notification
        try { notification = await sendNotification(quote) }
        catch { notification = 'failed' }
        return json(res, 201, { id: quote.id, createdAt: quote.createdAt, notification })
      } catch { return json(res, 500, { error: 'Chưa lưu được yêu cầu. Vui lòng thử lại sau.' }) }
    }
    if (url.pathname.startsWith('/api/')) return json(res, 404, { error: 'Không tìm thấy địa chỉ.' })
    if (!['GET', 'HEAD'].includes(req.method)) return json(res, 405, { error: 'Phương thức không được hỗ trợ.' })
    let filename
    try { filename = resolve(staticDirectory, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname)) } catch { return json(res, 400, { error: 'Địa chỉ không hợp lệ.' }) }
    if (!filename.startsWith(resolve(staticDirectory) + sep)) return json(res, 403, { error: 'Không được truy cập.' })
    try {
      const content = await readFile(filename)
      res.writeHead(200, { 'Content-Type': types[extname(filename)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' })
      res.end(req.method === 'HEAD' ? undefined : content)
    } catch { json(res, 404, { error: 'Không tìm thấy trang.' }) }
  })
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 3001)
  createApp().listen(port, '127.0.0.1', () => console.log(`Shop hoa HẬU: http://localhost:${port}`))
}
