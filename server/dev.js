import { createServer } from 'vite'
import { createApp } from './index.js'

const api = createApp()
await new Promise((resolve, reject) => { api.once('error', reject); api.listen(3001, '127.0.0.1', resolve) })
try {
  const vite = await createServer({ server: { host: '127.0.0.1', port: 5173, strictPort: true, proxy: { '/api': 'http://127.0.0.1:3001' } } })
  await vite.listen()
  vite.printUrls()
  const close = async () => { await vite.close(); api.close(); process.exit(0) }
  process.on('SIGINT', close)
  process.on('SIGTERM', close)
} catch (error) { api.close(); throw error }
