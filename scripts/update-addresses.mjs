import { mkdir, writeFile } from 'node:fs/promises'

const urls = ['https://provinces.open-api.vn/api/v2/?depth=2', 'https://provinces.open-api.vn/api/v1/?depth=2']
const [current, legacy] = await Promise.all(urls.map(async url => {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) })
  if (!response.ok) throw new Error(`Address source returned ${response.status}`)
  return response.json()
}))
const data = {
  source: 'https://provinces.open-api.vn/',
  updatedAt: new Date().toISOString().slice(0, 10),
  provinces: current.map(p => ({ name: p.name, wards: p.wards.map(w => w.name) })),
  legacyDistricts: legacy.flatMap(p => p.districts.map(d => `${d.name}, ${p.name}`))
}
if (data.provinces.length < 30 || data.legacyDistricts.length < 500) throw new Error('Incomplete address data')
await mkdir(new URL('../public/data/', import.meta.url), { recursive: true })
await writeFile(new URL('../public/data/vietnam-addresses.json', import.meta.url), JSON.stringify(data))
console.log(`${data.provinces.length} provinces, ${data.provinces.reduce((n, p) => n + p.wards.length, 0)} wards; legacy districts labeled separately.`)
