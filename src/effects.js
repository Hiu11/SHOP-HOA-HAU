import './effects.css'

export function initEffects() {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)')
  const animate = (element, frames, options) => {
    if (!reducedMotion.matches) return element.animate(frames, options)
  }

  // Keep content visible even when animations or observers are unavailable.
  const revealTargets = document.querySelectorAll('.section-head, .about-photo, .about-copy, .product-card, .wholesale-panel, .benefit-card, .gallery-item, .timeline-step, .contact-info, .quote-form')
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      revealObserver.unobserve(entry.target)
      const siblings = [...entry.target.parentElement.children]
      animate(entry.target, [
        { opacity: 0, transform: 'translateY(32px) scale(.98)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' }
      ], { duration: 700, delay: (siblings.indexOf(entry.target) % 4) * 85, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' })
    })
  }, { threshold: .12 })
  revealTargets.forEach(target => revealObserver.observe(target))

  document.querySelectorAll('.hero-copy > *').forEach((element, index) => {
    animate(element, [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 850, delay: index * 120, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' })
  })

  const petals = document.createElement('div')
  petals.className = 'petals'
  petals.setAttribute('aria-hidden', 'true')
  for (let index = 0; index < 14; index++) {
    const petal = document.createElement('i')
    petal.style.cssText = `--left:${(index * 37 + 9) % 100}%;--duration:${12 + index % 7}s;--delay:-${index * 1.7}s;--size:${9 + index % 5 * 3}px;--drift:${index % 2 ? 95 : -95}px;`
    petals.append(petal)
  }
  document.querySelector('.hero').prepend(petals)

  const progress = document.createElement('div')
  progress.className = 'reading-progress'
  progress.setAttribute('aria-hidden', 'true')
  document.body.append(progress)
  let scrollPending = false
  const updateScroll = () => {
    const distance = document.documentElement.scrollHeight - innerHeight
    progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0})`
    document.querySelector('.topbar').classList.toggle('is-scrolled', scrollY > 24)
    scrollPending = false
  }
  addEventListener('scroll', () => {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScroll) }
  }, { passive: true })
  addEventListener('resize', updateScroll, { passive: true })
  updateScroll()

  const navigation = [...document.querySelectorAll('.main-nav a')]
  const sections = navigation.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean)
  const activeSections = new Set()
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? activeSections.add(entry.target) : activeSections.delete(entry.target))
    const current = sections.find(section => activeSections.has(section))
    navigation.forEach(link => {
      const active = link.hash === `#${current?.id}`
      link.classList.toggle('is-active', active)
      if (active) link.setAttribute('aria-current', 'location')
      else link.removeAttribute('aria-current')
    })
  }, { rootMargin: '-15% 0px -45% 0px' })
  sections.forEach(section => navObserver.observe(section))

  document.querySelectorAll('.btn, .quote-trigger, .filter, .float-btn').forEach(button => {
    button.addEventListener('click', event => {
      if (reducedMotion.matches || button.disabled) return
      const bounds = button.getBoundingClientRect()
      const ripple = document.createElement('span')
      ripple.className = 'click-ripple'
      ripple.style.left = `${event.detail ? event.clientX - bounds.left : bounds.width / 2}px`
      ripple.style.top = `${event.detail ? event.clientY - bounds.top : bounds.height / 2}px`
      ripple.setAttribute('aria-hidden', 'true')
      button.append(ripple)
      const motion = ripple.animate([{ opacity: .4, transform: 'translate(-50%, -50%) scale(0)' }, { opacity: 0, transform: 'translate(-50%, -50%) scale(1)' }], { duration: 650, easing: 'ease-out' })
      motion.finished.catch(() => {}).finally(() => ripple.remove())
    })
  })

  document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.product-card').forEach((card, index) => {
        if (card.style.display === 'none') return
        animate(card, [{ opacity: .25, transform: 'translateY(16px) scale(.97)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }], { duration: 380, delay: index * 35, easing: 'ease-out' })
      })
    })
  })

  const visual = document.querySelector('.hero-visual')
  visual.addEventListener('pointermove', event => {
    if (!finePointer.matches || reducedMotion.matches) return
    const bounds = visual.getBoundingClientRect()
    visual.style.setProperty('--tilt-x', `${((event.clientY - bounds.top) / bounds.height - .5) * -6}deg`)
    visual.style.setProperty('--tilt-y', `${((event.clientX - bounds.left) / bounds.width - .5) * 6}deg`)
  })
  visual.addEventListener('pointerleave', () => {
    visual.style.setProperty('--tilt-x', '0deg')
    visual.style.setProperty('--tilt-y', '0deg')
  })
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) document.getAnimations().forEach(animation => animation.cancel())
  })
}
