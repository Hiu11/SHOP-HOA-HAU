import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createApp } from './index.js'
import { today, validateQuote, flowerNames } from './quotes.js'

const valid = () => ({ name: 'Nguyễn An', phone: '0912 345 678', flowerType: 'Hoa lay ơn hồng', quantity: '20', date: today(), location: 'Hồ Thị Kỷ, TP.HCM', note: 'Hoa màu hồng' })

test('validates quantity, phone, flower and delivery date', () => {
  assert.equal(validateQuote(valid()).phone, '0912345678')
  for (const flowerType of flowerNames) assert.equal(validateQuote({ ...valid(), flowerType }).flowerType, flowerType)
  assert.throws(() => validateQuote({ ...valid(), flowerType: 'Hoa hồng' }))
  for (const patch of [{ phone: '123' }, { flowerType: 'unknown' }, { quantity: 1.5 }, { quantity: 0 }, { date: '2020-01-01' }, { date: '2099-02-31' }, { name: ' ' }, { location: '' }, { note: 'a'.repeat(2001) }]) {
    assert.throws(() => validateQuote({ ...valid(), ...patch }))
  }
})

test('API persists valid requests, rejects invalid input, and keeps customer data private', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'flower-test-'))
  await writeFile(join(directory, 'index.html'), '<h1>Hoa tươi</h1>')
  const server = createApp({ storageDirectory: directory, staticDirectory: directory })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const url = `http://127.0.0.1:${server.address().port}`
  try {
    const page = await fetch(url)
    assert.equal(page.status, 200)
    assert.match(page.headers.get('content-type'), /text\/html/)
    assert.equal(await page.text(), '<h1>Hoa tươi</h1>')
    const send = body => fetch(url + '/api/quotes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const response = await send({ ...valid(), flowerType: 'Hoa hướng dương' })
    assert.equal(response.status, 201)
    const result = await response.json()
    const stored = JSON.parse((await readFile(join(directory, 'quotes.jsonl'), 'utf8')).trim())
    assert.equal(stored.id, result.id)
    assert.equal(stored.quantity, 20)
    assert.equal(stored.flowerType, 'Hoa hướng dương')
    assert.equal(stored.name, valid().name)
    assert.equal((await send({ ...valid(), phone: 'invalid' })).status, 400)
    assert.equal((await fetch(url + '/api/quotes')).status, 405)
    assert.equal((await fetch(url + '/data/quotes.jsonl')).status, 404)
    assert.equal((await send({ ...valid(), note: 'x'.repeat(17000) })).status, 413)
    assert.equal((await readFile(join(directory, 'quotes.jsonl'), 'utf8')).trim().split('\n').length, 1)
  } finally {
    await new Promise(resolve => server.close(resolve))
    await rm(directory, { recursive: true, force: true })
  }
})

test('storage failure never reports success', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'flower-test-'))
  const file = join(directory, 'file')
  await writeFile(file, 'not a directory')
  const server = createApp({ storageDirectory: file })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}/api/quotes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(valid()) })
    assert.equal(response.status, 500)
    assert.equal((await response.json()).id, undefined)
  } finally {
    await new Promise(resolve => server.close(resolve))
    await rm(directory, { recursive: true, force: true })
  }
})
