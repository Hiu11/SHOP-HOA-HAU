export const streetExamples = ['Hồ Thị Kỷ', 'Lý Thái Tổ', 'Lê Hồng Phong', 'Nguyễn Tri Phương', 'Hùng Vương', 'Nguyễn Đình Chiểu', 'Điện Biên Phủ', 'Cách Mạng Tháng Tám']

export function composeAddress(data) {
  const district = String(data.district ?? '').split(',')[0]
  return [data.street, data.ward, district, data.province].map(part => String(part ?? '').trim()).filter(Boolean).join(', ')
}

export function initAddressForm(form) {
  const province = form.elements.namedItem('province')
  const ward = form.elements.namedItem('ward')
  const help = document.querySelector('#addressHelp')
  let provinces = []
  const options = (listId, names) => {
    document.querySelector(`#${listId}`).replaceChildren(...names.map(name => {
      const option = document.createElement('option')
      option.value = name
      return option
    }))
  }
  const updateWards = () => {
    const selected = provinces.find(p => p.name === province.value)
    options('wardSuggestions', selected?.wards ?? [])
  }
  province.addEventListener('input', () => { ward.value = ''; updateWards() })
  province.addEventListener('change', updateWards)
  options('streetSuggestions', streetExamples)
  fetch('/address-data/vietnam-addresses.json').then(response => {
    if (!response.ok) throw new Error('Address list unavailable')
    return response.json()
  }).then(data => {
    provinces = data.provinces
    options('provinceSuggestions', provinces.map(p => p.name))
    options('districtSuggestions', data.legacyDistricts)
    updateWards()
  }).catch(() => {
    help.textContent = 'Chưa tải được danh sách gợi ý. Bạn vẫn có thể nhập đầy đủ địa chỉ bằng tay.'
  })
}
