import { suggestionField } from './suggestion-field.js'

export const streetExamples = ['Hồ Thị Kỷ', 'Lý Thái Tổ', 'Lê Hồng Phong', 'Nguyễn Tri Phương', 'Hùng Vương', 'Nguyễn Đình Chiểu', 'Điện Biên Phủ', 'Cách Mạng Tháng Tám']

export function composeAddress(data) {
  return [data.street, data.ward, data.province].map(part => String(part ?? '').trim()).filter(Boolean).join(', ')
}

export function initAddressForm(form) {
  const province = form.elements.namedItem('province')
  const ward = form.elements.namedItem('ward')
  const help = document.querySelector('#addressHelp')
  const suggestions = {
    provinceSuggestions: suggestionField(province),
    wardSuggestions: suggestionField(ward),
    streetSuggestions: suggestionField(form.elements.namedItem('street'))
  }
  let provinces = []
  let previousProvince = province.value
  const options = (listId, names) => {
    suggestions[listId].setOptions(names)
  }
  const updateWards = () => {
    const selected = provinces.find(p => p.name === province.value)
    options('wardSuggestions', selected?.wards ?? [])
  }
  province.addEventListener('input', () => {
    if (province.value !== previousProvince) {
      ward.value = ''
      previousProvince = province.value
    }
    updateWards()
  })
  province.addEventListener('change', updateWards)
  options('streetSuggestions', streetExamples)
  fetch('/address-data/vietnam-addresses.json').then(response => {
    if (!response.ok) throw new Error('Address list unavailable')
    return response.json()
  }).then(data => {
    provinces = data.provinces
    options('provinceSuggestions', provinces.map(p => p.name))
    updateWards()
  }).catch(() => {
    help.textContent = 'Chưa tải được danh sách gợi ý. Bạn vẫn có thể nhập đầy đủ địa chỉ bằng tay.'
  })
}
