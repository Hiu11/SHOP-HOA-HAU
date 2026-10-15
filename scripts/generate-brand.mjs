import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'

const directory = fileURLToPath(new URL('../public/brand/', import.meta.url))
const fontPath = fileURLToPath(new URL('../public/fonts/lora-italic.ttf', import.meta.url))
const font = await readFile(fontPath)
const officialIcon = await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8')
const iconContents = officialIcon.slice(officialIcon.indexOf('>') + 1, officialIcon.lastIndexOf('</svg>'))
await mkdir(directory, { recursive: true })

for (const [variant, ink, badge, flower] of [
  ['logo-shop-hoa-hau', '#1d3329', '#1d3329', '#f4d7ba'],
  ['logo-shop-hoa-hau-light', '#ffe4c4', '#f4d7ba', '#1d3329']
]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="600" viewBox="0 0 560 240" role="img" aria-labelledby="title desc">
  <title id="title">SHOP HOA HẬU</title><desc id="desc">Logo chữ HẬU, chuyên sỉ lay ơn và hướng dương. Biểu tượng Flower 2 từ Lucide, giấy phép ISC.</desc>
  <style>@font-face{font-family:Lora;src:url(data:font/ttf;base64,${font.toString('base64')}) format('truetype');font-style:italic;font-weight:400 700}</style>
  <rect x="20" y="64" width="132" height="132" rx="38" fill="${badge}"/>
  <g transform="translate(44 88) scale(3.5)" fill="none" stroke="${flower}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${iconContents}</g>
  <g fill="${ink}">
  <text x="180" y="39" font-family="Segoe UI,Arial,sans-serif" font-size="18" font-weight="700" letter-spacing="5">SHOP HOA</text>
  <text x="170" y="174" font-family="Lora" font-style="italic" font-size="132" font-weight="700" letter-spacing="-5">HẬU</text>
  <text x="180" y="213" font-family="Segoe UI,Arial,sans-serif" font-size="14" font-weight="500" letter-spacing="1">LAY ƠN · HƯỚNG DƯƠNG</text>
  </g>
  </svg>`
  await writeFile(`${directory}${variant}.svg`, svg)
  const render = new Resvg(svg, { font: { fontFiles: [fontPath], loadSystemFonts: true } })
  await writeFile(`${directory}${variant}.png`, render.render().asPng())
}
console.log('Logo SVG and transparent PNG exported to public/brand/')
