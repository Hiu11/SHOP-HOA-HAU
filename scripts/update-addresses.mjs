import { mkdir, writeFile } from 'node:fs/promises'

const response = await fetch('https://provinces.open-api.vn/api/v2/?depth=2', { signal: AbortSignal.timeout(30000) })
if (!response.ok) throw new Error(`Address source returned ${response.status}`)
const current = await response.json()
const data = {
  source: 'https://provinces.open-api.vn/',
  updatedAt: new Date().toISOString().slice(0, 10),
  provinces: current.map(p => ({ name: p.name, wards: p.wards.map(w => w.name) }))
}
if (data.provinces.length < 30) throw new Error('Incomplete address data')
await mkdir(new URL('../public/address-data/', import.meta.url), { recursive: true })
await writeFile(new URL('../public/address-data/vietnam-addresses.json', import.meta.url), JSON.stringify(data))
console.log(`${data.provinces.length} provinces, ${data.provinces.reduce((n, p) => n + p.wards.length, 0)} wards.`)
