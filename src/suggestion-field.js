import { createElement, ChevronDown } from 'lucide'

// Keep the selected value intact: clicking or focusing opens the full list again.
export function suggestionField(input) {
  const wrapper = document.createElement('div')
  wrapper.className = 'suggest-field'
  input.replaceWith(wrapper)
  wrapper.append(input)
  input.removeAttribute('list')
  input.setAttribute('role', 'combobox')
  input.setAttribute('aria-autocomplete', 'list')
  input.setAttribute('aria-expanded', 'false')
  input.autocomplete = 'off'
  const list = document.createElement('ul')
  list.id = `${input.id}Options`
  list.className = 'suggest-options'
  list.setAttribute('role', 'listbox')
  list.setAttribute('aria-label', input.labels?.[0]?.textContent || 'Gợi ý')
  list.hidden = true
  input.setAttribute('aria-controls', list.id)
  const toggle = document.createElement('button')
  toggle.type = 'button'
  toggle.className = 'suggest-toggle'
  toggle.setAttribute('aria-label', `Mở gợi ý ${input.labels?.[0]?.textContent || ''}`)
  toggle.setAttribute('aria-controls', list.id)
  toggle.innerHTML = createElement(ChevronDown, { class: 'icon', 'aria-hidden': 'true' }).outerHTML
  wrapper.append(toggle, list)
  let names = [], shown = [], active = -1
  const normalized = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd')
  const close = () => { list.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); active = -1 }
  const select = value => {
    input.value = value
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
    input.focus()
    close()
  }
  const show = (query = '') => {
    active = -1
    input.removeAttribute('aria-activedescendant')
    shown = names.filter(name => normalized(name).includes(normalized(query)))
    list.replaceChildren(...shown.map((name, index) => {
      const item = document.createElement('li')
      item.id = `${list.id}-${index}`
      item.setAttribute('role', 'option')
      item.setAttribute('aria-selected', String(name === input.value))
      item.textContent = name
      item.addEventListener('pointerdown', event => event.preventDefault())
      item.addEventListener('click', () => select(name))
      return item
    }))
    if (!shown.length) {
      const empty = document.createElement('li')
      empty.className = 'suggest-empty'
      empty.textContent = 'Chưa có gợi ý phù hợp. Bạn có thể nhập bằng tay.'
      list.append(empty)
    }
    list.hidden = false
    input.setAttribute('aria-expanded', 'true')
  }
  input.addEventListener('focus', () => show())
  input.addEventListener('click', () => show())
  input.addEventListener('input', event => { if (event.isTrusted) show(input.value) })
  input.addEventListener('keydown', event => {
    if (event.key === 'Escape') { close(); return }
    if (event.key === 'Tab') { close(); return }
    if (event.key === 'Enter' && !list.hidden && active >= 0) { event.preventDefault(); select(shown[active]); return }
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return
    event.preventDefault()
    if (list.hidden) show()
    if (!shown.length) return
    active = active < 0 ? (event.key === 'ArrowDown' ? 0 : shown.length - 1) : (active + (event.key === 'ArrowDown' ? 1 : -1) + shown.length) % shown.length
    ;[...list.children].forEach((item, index) => item.setAttribute('aria-selected', String(index === active)))
    input.setAttribute('aria-activedescendant', `${list.id}-${active}`)
    list.children[active].scrollIntoView({ block: 'nearest' })
  })
  toggle.addEventListener('click', () => {
    const wasOpen = !list.hidden
    input.focus()
    if (wasOpen) close()
    else show()
  })
  wrapper.addEventListener('focusout', event => { if (!wrapper.contains(event.relatedTarget)) close() })
  document.addEventListener('pointerdown', event => { if (!wrapper.contains(event.target)) close() })
  return { setOptions(values) { names = values; if (!list.hidden) show() } }
}
