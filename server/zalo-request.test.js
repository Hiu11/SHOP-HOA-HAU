import test from 'node:test'
import assert from 'node:assert/strict'
import { zaloDestination, formatZaloRequest, copyRequest } from '../src/zalo-request.js'

test('only the explicit test link sends to the test recipient', () => {
  assert.equal(zaloDestination('?zalo-test=1').phone, '0961146542')
  for (const search of ['', '?zalo-test=0', '?phone=0961146542', '?zalo-test=0961146542']) {
    assert.equal(zaloDestination(search).phone, '0798971155')
    assert.equal(zaloDestination(search).testMode, false)
  }
})

test('the Zalo message contains the complete request and clearly marks test orders', () => {
  const data = { name: ' Khách thử ', phone: '0961146542', flowerType: 'Lay ơn hồng', quantity: 1, date: '2026-10-21', location: 'Không giao hàng', note: 'Chỉ kiểm thử' }
  const text = formatZaloRequest(data, true)
  for (const fragment of ['KHÔNG PHẢI ĐƠN HÀNG', 'Họ tên: Khách thử', '0961146542', 'Lay ơn hồng', '1 bó', '21/10/2026', 'Không giao hàng', 'Chỉ kiểm thử']) assert.ok(text.includes(fragment))
  const regular = formatZaloRequest({ ...data, note: '' })
  assert.ok(!regular.includes('KIỂM THỬ WEBSITE'))
  assert.ok(!regular.includes('Ghi chú:'))
})

test('clipboard denial is recoverable so the manual copy UI remains usable', async () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator')
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { clipboard: { writeText: async () => { throw new Error('Permission denied') } } } })
  try { assert.equal(await copyRequest('test'), false) }
  finally {
    if (descriptor) Object.defineProperty(globalThis, 'navigator', descriptor)
    else delete globalThis.navigator
  }
})
