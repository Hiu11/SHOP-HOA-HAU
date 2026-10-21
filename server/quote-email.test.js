import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { notifyQuote } from './quote-email.js'
import { createQuoteHandler } from '../api/quotes.js'
import { today } from './quotes.js'
import { composeAddress } from '../src/address-form.js'

const quote = () => ({ id: 'BG-test', createdAt: new Date().toISOString(), name: 'Khách kiểm thử', phone: '0912345678', flowerType: 'Hoa hướng dương', quantity: 2, date: today(), location: '80/12 Hồ Thị Kỷ, Phường Vườn Lài, Thành phố Hồ Chí Minh', note: 'Không giao hàng' })

test('email transport stays offline until explicitly enabled', async () => {
  assert.equal(await notifyQuote(quote(), { enabled: false, request: () => { throw new Error('Must not contact provider') } }), 'disabled')
})

test('email contains the complete saved request and uses the designated recipient', async () => {
  const item = quote()
  let calls = 0
  const status = await notifyQuote(item, { enabled: true, request: async (url, options) => {
    calls++
    assert.equal(url, 'https://formsubmit.co/ajax/tronghieudo2k4@gmail.com')
    const body = JSON.parse(options.body)
    for (const value of [item.id, item.name, item.phone, item.flowerType, item.location, item.note]) assert.ok(JSON.stringify(body).includes(value))
    return { ok: true, json: async () => ({ success: 'true' }) }
  } })
  assert.equal(calls, 1)
  assert.equal(status, 'accepted')
})

test('provider failure never reports a delivered email', async () => {
  for (const result of [{ ok: false }, { ok: true, json: async () => ({ success: false }) }]) {
    await assert.rejects(notifyQuote(quote(), { enabled: true, request: async () => result }))
  }
})

test('email failure preserves the saved request and its reference for manual follow-up', async () => {
  let saved
  const handler = createQuoteHandler({ saveQuote: async item => { saved = item }, sendNotification: async item => { assert.equal(item.id, saved.id); throw new Error('Provider down') } })
  const res = { setHeader() {}, status(value) { this.statusCode = value; return this }, json(value) { this.body = value } }
  await handler({ method: 'POST', headers: { 'content-type': 'application/json' }, body: quote() }, res)
  assert.equal(res.statusCode, 201)
  assert.equal(res.body.id, saved.id)
  assert.equal(res.body.notification, 'failed')
})

test('address suggestions include current wards and clearly separate legacy districts', async () => {
  const data = JSON.parse(await readFile(new URL('../public/address-data/vietnam-addresses.json', import.meta.url), 'utf8'))
  assert.equal(data.provinces.length, 34)
  const hcm = data.provinces.find(p => p.name === 'Thành phố Hồ Chí Minh')
  assert.ok(hcm.wards.includes('Phường Vườn Lài'))
  assert.ok(data.legacyDistricts.includes('Quận 10, Thành phố Hồ Chí Minh'))
  assert.equal(composeAddress({ street: ' 80/12 Hồ Thị Kỷ ', ward: 'Phường Vườn Lài', district: 'Quận 10, Thành phố Hồ Chí Minh', province: hcm.name }), '80/12 Hồ Thị Kỷ, Phường Vườn Lài, Quận 10, Thành phố Hồ Chí Minh')
  assert.equal(composeAddress({ street: '80/12 Hồ Thị Kỷ', ward: 'Phường Vườn Lài', province: hcm.name }), '80/12 Hồ Thị Kỷ, Phường Vườn Lài, Thành phố Hồ Chí Minh')
})
