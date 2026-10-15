import test from 'node:test'
import assert from 'node:assert/strict'

let sequence = 0
async function browserState({ type = 'navigate', x = 90, y = 340, scale = 1 } = {}) {
  const listeners = {}
  const moves = []
  const replacements = []
  const previous = Object.fromEntries(['window', 'document', 'performance', 'history', 'location', 'requestAnimationFrame'].map(key => [key, globalThis[key]]))
  const screen = {
    scrollX: x, scrollY: y,
    visualViewport: { scale, addEventListener() {} },
    addEventListener(name, fn) { (listeners[name] ||= []).push(fn) },
    scrollTo(position) { moves.push(position); this.scrollX = position.left; this.scrollY = position.top }
  }
  Object.assign(globalThis, {
    window: screen, document: { fonts: { ready: Promise.resolve() } },
    performance: { getEntriesByType: () => [{ type }] },
    history: { state: {}, scrollRestoration: 'auto', replaceState: (...args) => replacements.push(args) },
    location: { pathname: '/', search: '?layout=mobile', hash: '#catalog' },
    requestAnimationFrame: fn => fn()
  })
  await import(`../public/reload.js?test=${sequence++}`)
  return { screen, moves, replacements, fire: name => listeners[name]?.forEach(fn => fn({ persisted: false })), restore: () => Object.assign(globalThis, previous) }
}

test('clears stale horizontal offsets on load and resize without losing vertical position', async () => {
  const state = await browserState()
  try {
    assert.equal(state.screen.scrollX, 0)
    assert.equal(state.screen.scrollY, 340)
    assert.equal(state.replacements.length, 0)
    state.screen.scrollX = 120
    state.screen.scrollY = 700
    state.fire('resize')
    assert.equal(state.screen.scrollX, 0)
    assert.equal(state.screen.scrollY, 700)
  } finally { state.restore() }
})

test('does not interfere with pinch zoom or an already aligned page', async () => {
  for (const options of [{ x: 90, scale: 2 }, { x: 0 }]) {
    const state = await browserState(options)
    try { assert.equal(state.moves.length, 0) } finally { state.restore() }
  }
})

test('reload still returns to the top and removes the old section anchor', async () => {
  const state = await browserState({ type: 'reload' })
  try {
    state.fire('pageshow')
    assert.equal(state.screen.scrollX, 0)
    assert.equal(state.screen.scrollY, 0)
    assert.equal(state.replacements[0][2], '/?layout=mobile')
    assert.equal(history.scrollRestoration, 'auto')
  } finally { state.restore() }
})
