import test from 'node:test'
import assert from 'node:assert/strict'
import { createQuoteHandler } from '../api/quotes.js'
import { today } from './quotes.js'

const quote = () => ({ name: 'Khách kiểm thử', phone: '0912345678', flowerType: 'Hoa hướng dương', quantity: 10, date: today(), quoteTime: 'anytime', location: 'Hồ Thị Kỷ, TP.HCM', note: '' })
function response() {
  return { headers: {}, setHeader(name, value) { this.headers[name] = value }, status(value) { this.statusCode = value; return this }, json(value) { this.body = value } }
}

test('Vercel API saves a quote before returning a reference without customer details', async () => {
  let stored
  const handler = createQuoteHandler({ saveQuote: async data => { stored = data } })
  const res = response()
  await handler({ method: 'POST', headers: { 'content-type': 'application/json' }, body: quote() }, res)
  assert.equal(res.statusCode, 201)
  assert.equal(stored.flowerType, 'Hoa hướng dương')
  assert.equal(res.body.id, stored.id)
  assert.equal(res.body.phone, undefined)
  assert.equal(res.headers['Cache-Control'], 'no-store')
})

test('Vercel API rejects invalid input, reads, oversized requests and storage failures', async () => {
  let writes = 0
  const handler = createQuoteHandler({ saveQuote: async () => { writes++; throw new Error('offline') } })
  for (const [req, expected] of [
    [{ method: 'GET', headers: {} }, 405],
    [{ method: 'POST', headers: {}, body: quote() }, 415],
    [{ method: 'POST', headers: { 'content-type': 'application/json' }, body: { ...quote(), phone: 'invalid' } }, 400],
    [{ method: 'POST', headers: { 'content-type': 'application/json' }, body: { ...quote(), note: 'a'.repeat(17000) } }, 413],
    [{ method: 'POST', headers: { 'content-type': 'application/json' }, body: quote() }, 503]
  ]) {
    const res = response()
    await handler(req, res)
    assert.equal(res.statusCode, expected)
    assert.equal(res.body.id, undefined)
  }
  assert.equal(writes, 1)
})
