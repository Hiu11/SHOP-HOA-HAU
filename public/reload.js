// Run in the head, before the browser restores scroll or follows the old hash.
(() => {
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
