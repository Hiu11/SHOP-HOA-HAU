export function initFormValidation(form) {
  const fields = [...form.querySelectorAll('input[name],select[name],textarea[name]')].filter(field => !field.readOnly && field.type !== 'hidden')
  const errors = new Map()
  fields.forEach(field => {
    const error = document.createElement('small')
    error.id = `${field.id}Error`
    error.className = 'field-error'
    error.hidden = true
    field.closest('.input-group').append(error)
    field.setAttribute('aria-describedby', [field.getAttribute('aria-describedby'), error.id].filter(Boolean).join(' '))
    errors.set(field, error)
  })
  const check = field => {
    field.setCustomValidity('')
    if (field.required && !field.value.trim()) field.setCustomValidity('Vui lòng điền thông tin này.')
    if (field.name === 'phone' && field.value && !/^(0\d{9}|\+84\d{9})$/.test(field.value.replace(/[\s.()-]/g, ''))) field.setCustomValidity('Nhập số điện thoại 10 chữ số hoặc bắt đầu bằng +84.')
    const invalid = !field.checkValidity()
    field.setAttribute('aria-invalid', String(invalid))
    const error = errors.get(field)
    error.hidden = !invalid
    error.textContent = invalid ? field.validationMessage : ''
    return !invalid
  }
  fields.forEach(field => {
    for (const event of ['input', 'change']) field.addEventListener(event, () => {
      if (form.classList.contains('was-validated') || field.getAttribute('aria-invalid') === 'true') check(field)
    })
  })
  return () => {
    form.classList.add('was-validated')
    const invalid = fields.filter(field => !check(field))
    if (invalid.length) invalid[0].focus()
    return invalid.length === 0
  }
}
