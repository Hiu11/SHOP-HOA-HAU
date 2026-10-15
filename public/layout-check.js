// Explicit support view only; no collection or transmission of visitor data.
if (new URLSearchParams(location.search).has('layout-check')) {
  window.addEventListener('load', () => {
    const report = document.createElement('output')
    report.setAttribute('aria-label', 'Thông tin kiểm tra kích thước trang')
    report.style.cssText = 'position:fixed;z-index:99999;left:12px;right:12px;bottom:84px;padding:10px;border:1px solid #c48d81;border-radius:8px;background:#fffdf5f5;color:#1d3329;font:12px/1.5 monospace;white-space:pre-wrap;overflow-wrap:anywhere;max-height:180px;overflow:auto;'
    document.body.append(report)
    const update = () => {
      const view = window.visualViewport
      const lines = [`Viewport ${innerWidth}/${document.documentElement.clientWidth}; scrollX ${scrollX}; zoom ${view?.scale?.toFixed(2)}; pan ${view?.offsetLeft?.toFixed(0)}`]
      for (const selector of ['body', '#app', '.nav-wrap', '.hero-grid', '.hero-copy']) {
        const el = document.querySelector(selector)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        lines.push(`${selector}: x=${Math.round(rect.left)} w=${Math.round(rect.width)} content=${el.scrollWidth}`)
      }
      report.textContent = lines.join('\n')
    }
    update()
    document.fonts?.ready.then(update)
    window.addEventListener('resize', update, { passive: true })
    window.visualViewport?.addEventListener('resize', update, { passive: true })
    window.visualViewport?.addEventListener('scroll', update, { passive: true })
  }, { once: true })
}
