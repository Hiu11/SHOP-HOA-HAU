export function zaloDestination(search = '') {
  const testMode = new URLSearchParams(search).get('zalo-test') === '1'
  return { testMode, phone: testMode ? '0961146542' : '0798971155', label: testMode ? '0961 146 542' : '0798 971 155' }
}

export function formatZaloRequest(data, testMode = false) {
  const value = key => String(data[key] ?? '').trim()
  const [year, month, day] = value('date').split('-')
  return [
    ...(testMode ? ['[KIỂM THỬ WEBSITE — KHÔNG PHẢI ĐƠN HÀNG]'] : []),
    'Chào shop hoa HẬU, mình muốn nhận báo giá sỉ:',
    `Họ tên: ${value('name')}`,
    `Số điện thoại: ${value('phone')}`,
    `Loại hoa / màu: ${value('flowerType')}`,
    `Số lượng: ${value('quantity')} bó`,
    `Ngày cần nhận: ${day}/${month}/${year}`,
    `Địa điểm giao: ${value('location')}`,
    ...(value('note') ? [`Ghi chú: ${value('note')}`] : [])
  ].join('\n')
}

export async function copyRequest(text) {
  try { await navigator.clipboard.writeText(text); return true }
  catch { return false }
}
