import test from 'node:test'
import assert from 'node:assert/strict'

let version = 0
async function entry(hostname) {
  const original = globalThis.location
  const redirects = []
  globalThis.location = { hostname, pathname: '/', search: '?source=test', hash: '#contact', replace: url => redirects.push(url) }
  try { await import(`../public/site-entry.js?test=${version++}`); return redirects }
  finally {
    if (original === undefined) delete globalThis.location
    else globalThis.location = original
  }
}
test('deployment URLs open the permanent activated site and preserve the contact section', async () => {
  assert.deepEqual(await entry('shop-hoa-abc123-cine-sky-s-projects.vercel.app'), ['https://shop-hoa-hau.vercel.app/?source=test#contact'])
})
test('permanent domain and local development do not redirect', async () => {
  for (const host of ['shop-hoa-hau.vercel.app', 'localhost', '127.0.0.1']) assert.deepEqual(await entry(host), [])
})
