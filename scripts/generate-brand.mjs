import { writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'

const directory = fileURLToPath(new URL('../public/brand/', import.meta.url))
await mkdir(directory, { recursive: true })

// Custom brand letterforms, independent of the site's Lucide UI icons.
for (const [variant, ink, petal] of [
  ['logo-shop-hoa-hau', '#234637', '#ab665a'],
  ['logo-shop-hoa-hau-light', '#ffe4c4', '#e4aa9b']
]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="800" viewBox="0 0 600 300" role="img" aria-labelledby="title desc">
  <title id="title">SHOP HOA HẬU</title>
  <desc id="desc">Chữ HẬU từ nét cành hoa: lay ơn thành nét chữ H, đôi lá tạo dấu mũ, nụ hoa tạo dấu nặng. Hoa nhập từ vườn Đà Lạt.</desc>
  <g fill="${ink}">
    <text x="348" y="31" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="30" font-weight="600" letter-spacing="6">SHOP HOA</text>
    <!-- H: tapered stems joined by a growing crossbar. -->
    <path d="M58 117C72 101 91 96 105 100L77 223C74 235 79 240 91 237L90 243C66 252 51 245 56 223L81 113C84 102 72 108 61 121Z"/>
    <path d="M181 106C185 88 188 74 184 60C198 71 201 85 196 105L169 222C165 237 170 242 183 237L182 243C157 253 143 246 148 224Z"/>
    <path d="M47 184C93 153 140 176 194 148C163 183 104 163 47 190Z"/>
    <!-- A: hairline ascent, broad descending petal, living crossbar. -->
    <path d="M205 238L286 101C292 91 302 90 306 94L331 223C333 237 340 239 352 235L353 242C330 251 315 246 312 231L291 115L218 239Z"/>
    <path d="M239 187C264 176 287 188 314 172C298 193 272 184 239 194Z"/>
    <!-- U: bowl and climbing right stem with a leaf terminal. -->
    <path d="M371 105C382 100 395 97 405 100L382 202C374 237 393 243 412 237C439 228 452 207 461 172L480 101L488 101L462 207C458 227 457 238 471 236C485 234 493 226 501 215L506 219C493 241 469 253 455 244C446 239 444 230 446 218C428 245 394 256 372 243C350 230 356 206 361 183L378 111C380 104 375 106 371 110Z"/>
    <path d="M484 110C486 88 507 78 526 79C522 99 503 113 484 110Z"/>
    <!-- Leaves form the Vietnamese circumflex. -->
    <path d="M266 83C270 65 283 53 296 50C295 68 284 78 266 83ZM296 50C313 53 325 65 327 81C310 78 298 66 296 50Z"/>
    <!-- Continue the U exit stroke upward into the flower stem. -->
    <path d="M500 216C519 196 530 175 540 151L544 153C536 179 523 202 505 221Z"/>
    <path d="M523 188C528 174 541 168 552 169C548 182 536 188 523 188Z"/>
  </g>
  <!-- Gladiolus blossoms become the upper section of the H stem. -->
  <g fill="${petal}">
    <path d="M541 157C530 152 524 143 530 137C525 128 533 121 541 127C544 114 557 117 556 128C567 124 572 135 562 141C560 151 550 156 541 157Z"/>
    <path d="M188 81C165 82 152 66 155 51C170 49 185 60 188 81Z"/>
    <path d="M191 66C189 45 200 31 213 29C221 44 212 60 191 66Z"/>
    <path d="M184 103C173 106 151 101 146 88C140 80 144 73 151 76C150 66 161 64 165 74C172 65 181 73 177 83C185 86 184 95 184 103Z"/>
    <path d="M189 92C190 82 196 72 203 76C205 65 215 63 218 72C227 66 234 76 225 82C229 93 209 102 189 92Z"/>
    <!-- A compact flower bud forms the dot below A. -->
    <path d="M281 259C273 263 272 273 282 280C293 273 292 263 285 259L283 265Z"/>
  </g>
  <g fill="none" stroke="${ink}" stroke-width="1.5" stroke-linecap="round" opacity=".65">
    <path d="M158 55L183 77M154 81L179 98M210 35L194 61M220 77L194 90M489 105L519 84"/>
  </g>
  </svg>`
  await writeFile(`${directory}${variant}.svg`, svg)
  const render = new Resvg(svg, { font: { loadSystemFonts: true } })
  await writeFile(`${directory}${variant}.png`, render.render().asPng())
}
console.log('Botanical HẬU lettering exported as SVG and transparent PNG.')
