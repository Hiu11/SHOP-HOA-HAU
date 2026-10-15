// Run in the head, before the browser restores scroll or follows the old hash.
(() => {
  // Device emulation and browser restoration can retain an old horizontal offset
  // after the page changes from desktop to mobile. Keep vertical position intact.
  let pending = false
  const alignViewport = () => {
    pending = false
    if (window.visualViewport && window.visualViewport.scale > 1.01) return
    if (Math.abs(window.scrollX || 0) > 0) {
      window.scrollTo({ top: window.scrollY, left: 0, behavior: 'instant' })
    }
  }
  const scheduleAlignment = () => {
    if (pending) return
    pending = true
    requestAnimationFrame(alignViewport)
  }
  window.addEventListener('resize', scheduleAlignment, { passive: true })
  window.addEventListener('scroll', scheduleAlignment, { passive: true })
  window.addEventListener('pageshow', scheduleAlignment)
  window.addEventListener('load', scheduleAlignment, { once: true })
  window.visualViewport?.addEventListener('resize', scheduleAlignment, { passive: true })
  document.fonts?.ready.then(scheduleAlignment)
  alignViewport()

  if (performance.getEntriesByType('navigation')[0]?.type !== 'reload') return
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  if (location.hash) history.replaceState(history.state, '', location.pathname + location.search)
  const reset = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  reset()
  window.addEventListener('pageshow', event => {
    if (event.persisted) return
    reset()
    requestAnimationFrame(() => {
      reset()
      if ('scrollRestoration' in history) history.scrollRestoration = 'auto'
    })
  }, { once: true })
})()
