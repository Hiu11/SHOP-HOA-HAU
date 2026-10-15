import './layout.css'
import { initEffects } from './effects.js'


import { createElement, Flower2, Truck, BadgeDollarSign, Handshake, Package, Phone, CircleCheck, Check, Menu, X, ArrowUp, ArrowUpRight, Clock3, MessageCircle } from 'lucide'
const icon = (definition) => createElement(definition, { 'aria-hidden': 'true', focusable: 'false', class: 'icon' }).outerHTML

import { products, flowerNames } from '../shared/catalog.js'

const app = document.querySelector('#app')

app.innerHTML = `
  <header class="topbar">
    <div class="shop-container nav-wrap">
      <a class="brand brand-home" href="#home" aria-label="Shop hoa HẬU — Trang chủ">
        <img class="brand-logo" src="/brand/logo-shop-hoa-hau.svg?v=floral-3" width="600" height="300" alt="SHOP HOA HẬU" />
      </a>

      <nav class="main-nav" id="mainNav" aria-label="Điều hướng chính">
        <a href="#home">Trang chủ</a>
        <a href="#about">Giới thiệu</a>
        <a href="#catalog">Danh mục</a>
        <a href="#pricing">Giá sỉ</a>
        <a href="#gallery">Hình ảnh</a>
      </nav>

      <div class="nav-actions">
        <span class="working-hours">Mở cửa 24/24</span>
        <a class="btn btn-primary btn-small" href="https://zalo.me/0798971155" target="_blank" rel="noreferrer">${icon(MessageCircle)} Liên hệ Zalo</a>
      </div>

      <button class="menu-toggle" aria-label="Mở menu" aria-controls="mainNav" aria-expanded="false">${icon(Menu)}</button>
    </div>
  </header>

  <main>
    <section class="hero" id="home">
      <div class="hero-overlay"></div>
      <div class="shop-container hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">HOA SỈ HỒ THỊ KỶ · MỞ CỬA 24/24</span>
          <h1 class="hero-brand-title"><img class="hero-floral-logo" src="/brand/logo-shop-hoa-hau-light.svg?v=floral-3" width="600" height="300" alt="SHOP HOA HẬU" /><span class="hero-brand-specialty">Chuyên sỉ lay ơn & hướng dương</span></h1>
          <span class="hero-brand-motto">Từ vườn Đà Lạt, về với HẬU.</span>
          <p>
            Hoa nhập từ vườn Đà Lạt. HẬU chuyên cung cấp sỉ lay ơn các màu và hướng dương cho thương lái, cửa hàng hoa và đối tác kinh doanh.
            Shop mở cửa 24/24 tại Hồ Thị Kỷ. Liên hệ Zalo 0798 971 155 để chọn hoa và nhận báo giá.
          </p>

          <p class="arrival-note">${icon(Truck)} <span><strong>Hàng về từ 23h đến rạng sáng.</strong> Ghé khung giờ này sẽ có nhiều hoa để lựa chọn hơn.</span></p>

          <div class="cta-row">
            <a class="btn btn-primary" href="#catalog">XEM DANH MỤC HOA</a>
            <a class="btn btn-secondary" href="https://zalo.me/0798971155" target="_blank" rel="noreferrer">${icon(MessageCircle)} NHẬN GIÁ QUA ZALO</a>
          </div>

          <div class="hero-metrics">
            <div>
              <strong>24/24</strong>
              <span>mở cửa mỗi ngày</span>
            </div>
            <div>
              <strong>Giá sỉ</strong>
              <span>liên hệ theo số lượng</span>
            </div>
            <div>
              <strong>Hồ Thị Kỷ</strong>
              <span>phường Vườn Lài, TP.HCM</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="floating-card card-main">
            <span>Khung giờ chọn hoa</span>
            <strong>23h — rạng sáng</strong>
            <small>Hàng mới về, nhiều lựa chọn</small>
          </div>
          <div class="floating-card card-badge">
            <span>${icon(CircleCheck)} Mở cửa 24/24</span>
          </div>
          <div class="hero-image" role="img" aria-label="Cận cảnh cánh hoa lay ơn hồng"></div>
        </div>
      </div>
    </section>

    <section class="trust-bar">
      <div class="shop-container trust-grid">
        <div>${icon(Flower2)} Lay ơn các màu</div>
        <div>${icon(Flower2)} Có hoa hướng dương</div>
        <div>${icon(BadgeDollarSign)} Giá sỉ cạnh tranh</div>
        <div>${icon(Truck)} Hoa từ vườn Đà Lạt</div>
      </div>
    </section>

    <section class="section" id="about">
      <div class="shop-container about-grid">
        <div class="about-photo" role="img" aria-label="Những bông lay ơn tím tươi đang nở rộ"></div>
        <div class="about-copy">
          <span class="section-tag">VỀ CHÚNG TÔI</span>
          <h2>HẬU — hoa sỉ tại Hồ Thị Kỷ, mở cửa 24/24</h2>
          <p>
            Hoa tại HẬU được nhập từ vườn Đà Lạt. Shop chuyên cung cấp sỉ lay ơn các màu và hướng dương, phục vụ nhu cầu lấy hoa của thương lái và cửa hàng hoa suốt 24/24.
            Bạn có thể tìm shop đối diện Hoa tươi MƯỜI, nằm giữa số nhà 80/12 và 80/11 Hồ Thị Kỷ, phường Vườn Lài, TP.HCM.
          </p>
          <ul class="feature-list">
            <li>${icon(Check)} Hoa lay ơn nhiều màu và hướng dương vàng rực rỡ.</li>
            <li>${icon(Check)} Hàng về từ 23h đến rạng sáng — nhiều hoa để lựa chọn.</li>
            <li>${icon(Check)} Hoa nhập từ vườn Đà Lạt, được phân loại khi về shop.</li>
            <li>${icon(Check)} Liên hệ Zalo 0798 971 155 để trao đổi và nhận báo giá sỉ.</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section section-soft" id="catalog">
      <div class="shop-container">
        <div class="section-head">
          <div>
            <span class="section-tag">DANH MỤC HOA</span>
            <h2>Lay ơn đa sắc, hướng dương rực rỡ</h2>
            <p class="form-intro">Ảnh minh họa theo từng màu hoa. Liên hệ Zalo để xem hoa thực tế và nhận báo giá hôm nay.</p>
          </div>
          <div class="filter-group" aria-label="Product filters">
            <button class="filter active" data-filter="all" aria-pressed="true">Tất cả</button>
            <button class="filter" data-filter="warm" aria-pressed="false">Sắc ấm</button>
            <button class="filter" data-filter="soft" aria-pressed="false">Sắc dịu</button>
            <button class="filter" data-filter="sunflower" aria-pressed="false">Hướng dương</button>
          </div>
        </div>

        <div class="product-grid">
          ${products.map((item) => `
            <article class="product-card" data-status="${item.tone}">
              <div class="product-photo"><img class="product-image" src="${item.image}" alt="${item.name}" style="object-position: ${item.position}" loading="lazy" width="800" height="600"></div>
              <div class="product-body">
                <div class="product-meta">
                  <span class="product-status status-available">
                    Liên hệ đặt sỉ
                  </span>
                </div>
                <h3>${item.name}</h3>
                <p>Đơn vị: Bó</p>
                <p class="price-row">Giá: <strong>Liên hệ</strong></p>
                <button class="quote-trigger" data-flower="${item.name}">NHẬN BÁO GIÁ</button>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section wholesale-section" id="pricing" aria-labelledby="wholesale-title">
      <div class="shop-container">
        <div class="wholesale-panel">
          <div class="wholesale-photo">
            <img src="/images/lay-on-hong.jpg" alt="Cánh hoa lay ơn hồng tươi với những giọt sương" loading="lazy" width="1200" height="801">
            <div class="wholesale-photo-caption"><span>HỒ THỊ KỶ · TP.HCM</span><strong>Hoa đẹp cho<br>mỗi ngày buôn bán.</strong></div>
          </div>
          <div class="wholesale-content">
            <span class="wholesale-eyebrow">ĐỒNG HÀNH CÙNG KHÁCH SỈ</span>
            <h2 id="wholesale-title">Chọn hoa bạn thích.<br><em>Để HẬU gửi giá sỉ.</em></h2>
            <p class="wholesale-description">Nhắn loại hoa, màu sắc và số lượng cần lấy. HẬU sẽ báo giá theo hàng thực tế trong ngày.</p>
            <div class="wholesale-varieties"><span>${icon(Flower2)} Lay ơn các màu</span><span>${icon(Flower2)} Hướng dương</span></div>
            <a class="btn wholesale-button" href="https://zalo.me/0798971155" target="_blank" rel="noreferrer">${icon(MessageCircle)} Nhận báo giá qua Zalo ${icon(ArrowUpRight)}</a>
            <div class="wholesale-details">
              <span>${icon(Clock3)} Mở cửa 24/24</span>
              <span>${icon(Truck)} Hàng về 23h – rạng sáng</span>
            </div>
            <p class="wholesale-footnote">Giá tùy thời điểm và số lượng · Zalo 0798 971 155</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-soft" id="why-us">
      <div class="shop-container">
        <div class="section-head center">
          <div>
            <span class="section-tag">LỢI THẾ CẠNH TRANH</span>
            <h2>Tại sao thương lái chọn chúng tôi</h2>
          </div>
        </div>

        <div class="benefits-grid">
          <article class="benefit-card">
            <span>${icon(Flower2)}</span>
            <h3>Hoa tươi</h3>
            <p>Chú trọng chất lượng và độ tươi mỗi ngày.</p>
          </article>
          <article class="benefit-card">
            <span>${icon(BadgeDollarSign)}</span>
            <h3>Giá sỉ</h3>
            <p>Giá phù hợp với số lượng đặt thường xuyên.</p>
          </article>
          <article class="benefit-card">
            <span>${icon(Package)}</span>
            <h3>Đóng gói</h3>
            <p>Phân loại và đóng gói cẩn thận, đúng quy cách.</p>
          </article>
          <article class="benefit-card">
            <span>${icon(Truck)}</span>
            <h3>Giao hàng</h3>
            <p>Hỗ trợ giao hàng theo thỏa thuận.</p>
          </article>
          <article class="benefit-card">
            <span>${icon(Handshake)}</span>
            <h3>Hợp tác</h3>
            <p>Ưu tiên xây dựng quan hệ lâu dài.</p>
          </article>
          <article class="benefit-card">
            <span>${icon(Phone)}</span>
            <h3>Hỗ trợ</h3>
            <p>Tư vấn và báo giá nhanh chóng, rõ ràng.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section" id="gallery">
      <div class="shop-container">
        <div class="section-head center">
          <div>
            <span class="section-tag">THƯ VIỆN HÌNH ẢNH</span>
            <h2>Sắc lay ơn, nét duyên riêng</h2>
            <p class="form-intro">Ảnh hoa trang trí minh họa, không phải ảnh hàng thực tế của shop.</p>
          </div>
        </div>

        <div class="gallery-grid">
          <figure class="gallery-item"><img src="/images/lay-on-hong.jpg" alt="Hoa lay ơn hồng viền đậm với giọt sương trên cánh" loading="lazy" width="1200" height="801"><figcaption>Hồng dịu dàng</figcaption></figure>
          <figure class="gallery-item"><img src="/images/huong-duong-nen-sang.jpg" alt="Bông hướng dương vàng nổi bật trên nền sáng, thấy rõ nhụy và các cánh hoa" loading="lazy" width="1000" height="1500" style="object-position: center 48%"><figcaption>Hướng dương rực rỡ</figcaption></figure>
          <figure class="gallery-item"><img src="/images/lay-on-tim.jpg" alt="Cận cảnh những bông lay ơn tím đang nở" loading="lazy" width="1000" height="750"><figcaption>Tím đầy thương nhớ</figcaption></figure>
        </div>
      </div>
    </section>

    <section class="section section-soft" id="process">
      <div class="shop-container">
        <div class="section-head center">
          <div>
            <span class="section-tag">QUY TRÌNH ĐẶT HÀNG</span>
            <h2>Đơn giản, rõ ràng, nhanh chóng</h2>
          </div>
        </div>

        <div class="timeline">
          <div class="timeline-step">
            <span>01</span>
            <h3>Xem danh mục</h3>
            <p>Khách hàng xem các loại hoa đang có sẵn và lựa chọn mẫu phù hợp.</p>
          </div>
          <div class="timeline-step">
            <span>02</span>
            <h3>Yêu cầu báo giá</h3>
            <p>Gửi nhu cầu số lượng, thời gian nhận hoa và địa điểm giao hàng.</p>
          </div>
          <div class="timeline-step">
            <span>03</span>
            <h3>Xác nhận đơn</h3>
            <p>Shop xác nhận giá, thời gian và cách thức giao nhận chi tiết.</p>
          </div>
          <div class="timeline-step">
            <span>04</span>
            <h3>Nhận hoa</h3>
            <p>Khách nhận hoa và thanh toán theo thỏa thuận đã thống nhất.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="contact">
      <div class="shop-container contact-grid">
        <div class="contact-info">
          <span class="section-tag">LIÊN HỆ</span>
          <h2>Nhận báo giá sỉ ngay hôm nay</h2>
          <p class="sample-note">Đối diện Hoa tươi MƯỜI, nằm giữa hai số nhà 80/12 và 80/11 Hồ Thị Kỷ.</p>
          <ul>
            <li><strong>Shop:</strong> Shop hoa HẬU</li>
            <li><strong>Địa chỉ:</strong> Đối diện Hoa tươi MƯỜI, nằm giữa số nhà 80/12 và 80/11 Hồ Thị Kỷ, phường Vườn Lài, TP.HCM</li>
            <li><strong>Hotline:</strong> 0798 971 155</li>
            <li><strong>Zalo:</strong> 0798 971 155</li>
            <li><strong>Giờ mở cửa:</strong> 24/24, tất cả các ngày.</li>
            <li><strong>Giờ hàng về:</strong> Từ 23h đêm đến rạng sáng, có nhiều hàng để lựa chọn.</li>
            <li><strong>Tìm shop:</strong> Nhắn Zalo để được hướng dẫn đường đi và trao đổi nhu cầu lấy sỉ.</li>
          </ul>
          <div class="contact-actions">
            <a class="btn btn-primary" href="tel:0798971155">${icon(Phone)} GỌI ĐIỆN</a>
            <a class="btn btn-secondary" href="https://zalo.me/0798971155" target="_blank" rel="noreferrer">${icon(MessageCircle)} CHAT ZALO</a>
          </div>
          <a class="map-link" href="https://www.google.com/maps/search/?api=1&query=80%2F12%20H%E1%BB%93%20Th%E1%BB%8B%20K%E1%BB%B7%2C%20ph%C6%B0%E1%BB%9Dng%20V%C6%B0%E1%BB%9Dn%20L%C3%A0i%2C%20TP.HCM" target="_blank" rel="noreferrer">Mở khu vực 80/12 Hồ Thị Kỷ trên Google Maps</a>
        </div>

        <form class="quote-form" id="quoteForm">
          <h3>YÊU CẦU BÁO GIÁ SỈ</h3>
          <p class="form-intro">Cho chúng tôi biết nhu cầu của bạn. Mỗi yêu cầu được lưu kèm mã tham chiếu.</p>
          <div class="input-group">
            <label for="name">Họ và tên</label>
            <input id="name" name="name" type="text" autocomplete="name" minlength="2" maxlength="100" placeholder="Nhập họ tên" required />
          </div>
          <div class="input-group">
            <label for="phone">Số điện thoại</label>
            <input id="phone" name="phone" type="tel" autocomplete="tel" maxlength="20" placeholder="Ví dụ: 0912 345 678" required />
          </div>
          <div class="input-group">
            <label for="flowerType">Loại hoa / màu hoa</label>
            <select id="flowerType" name="flowerType" required>
              <option value="">Chọn hoa lay ơn hoặc hướng dương</option>
              ${flowerNames.map((name) => `<option value="${name}">${name}</option>`).join('')}
            </select>
          </div>
          <div class="input-group">
            <label for="quantity">Số lượng dự kiến (bó)</label>
            <input id="quantity" name="quantity" type="number" min="1" max="100000" step="1" placeholder="Ví dụ: 200" required />
          </div>
          <div class="input-group">
            <label for="date">Ngày cần nhận</label>
            <input id="date" name="date" type="date" required />
          </div>
          <div class="input-group">
            <label for="location">Địa điểm giao</label>
            <input id="location" name="location" type="text" autocomplete="street-address" minlength="5" maxlength="300" placeholder="Nhập địa điểm giao" required />
          </div>
          <div class="input-group">
            <label for="note">Màu khác / ghi chú</label>
            <textarea id="note" name="note" rows="4" maxlength="2000" placeholder="Ví dụ: màu hoa, quy cách đóng gói, giờ nhận..."></textarea>
          </div>

          <button type="submit" class="btn btn-primary full-width">GỬI YÊU CẦU</button>
          <p id="formMessage" class="form-message" aria-live="polite"></p>
          <p class="form-intro">Yêu cầu được lưu để đối chiếu. Để nhận tư vấn trực tiếp, vui lòng liên hệ Zalo 0798 971 155. Gửi form chưa phải xác nhận đơn hàng.</p>
        </form>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="shop-container footer-grid">
      <div>
        <div class="brand footer-brand">
          <img class="brand-logo" src="/brand/logo-shop-hoa-hau-light.svg?v=floral-3" width="600" height="300" alt="SHOP HOA HẬU" loading="lazy" />
        </div>
        <p>Hoa từ vườn Đà Lạt. Chuyên sỉ lay ơn các màu và hướng dương tại Hồ Thị Kỷ, TP.HCM. Mở cửa 24/24.</p>
      </div>
      <div>
        <h4>Trang chủ</h4>
        <a href="#home">Giới thiệu</a>
        <a href="#catalog">Danh mục</a>
        <a href="#pricing">Giá sỉ</a>
      </div>
      <div>
        <h4>Chính sách</h4>
        <a href="#process">Quy trình đặt</a>
        <a href="#contact">Báo giá</a>
        <a href="#gallery">Hình ảnh</a>
      </div>
      <div>
        <h4>Liên hệ</h4>
        <a href="tel:0798971155">0798 971 155</a>
        <a href="https://zalo.me/0798971155" target="_blank" rel="noreferrer">Zalo: 0798 971 155</a>
        <span>Hồ Thị Kỷ, phường Vườn Lài, TP.HCM</span>
      </div>
    </div>
    <div class="footer-bottom">© ${new Date().getFullYear()} Shop hoa HẬU · Lay ơn & hướng dương · Mở cửa 24/24 · Zalo 0798 971 155<br><a class="image-credits" href="/image-credits.html" target="_blank" rel="noreferrer">Nguồn ảnh minh họa</a></div>
  </footer>

  <div class="floating-contacts" aria-label="Quick contact buttons">
    <a href="https://zalo.me/0798971155" target="_blank" rel="noreferrer" class="float-btn zalo">${icon(MessageCircle)} ZALO</a>
    <a href="tel:0798971155" class="float-btn call">${icon(Phone)} GỌI ĐIỆN</a>
    <button class="float-btn top" type="button" aria-label="Scroll to top">${icon(ArrowUp)}</button>
  </div>
`

const menuToggle = document.querySelector('.menu-toggle')
const nav = document.querySelector('.main-nav')
const closeMenu = () => {
  nav.classList.remove('open')
  menuToggle.setAttribute('aria-expanded', 'false')
  menuToggle.setAttribute('aria-label', 'Mở menu')
  menuToggle.innerHTML = icon(Menu)
}
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open')
  menuToggle.setAttribute('aria-expanded', String(open))
  menuToggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu')
  menuToggle.innerHTML = icon(open ? X : Menu)
})
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu))
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu() })
document.addEventListener('click', event => { if (!event.target.closest('.nav-wrap')) closeMenu() })

const filterButtons = document.querySelectorAll('.filter')
const productCards = document.querySelectorAll('.product-card')
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter
    filterButtons.forEach((item) => {
      item.classList.toggle('active', item === button)
      item.setAttribute('aria-pressed', String(item === button))
    })

    productCards.forEach((card) => {
      const show = filter === 'all' || card.dataset.status === filter
      card.style.display = show ? 'flex' : 'none'
    })
  })
})

const quoteTriggers = document.querySelectorAll('.quote-trigger')
const flowerTypeSelect = document.querySelector('#flowerType')
quoteTriggers.forEach((button) => {
  button.addEventListener('click', () => {
    const flower = button.dataset.flower
    flowerTypeSelect.value = flower
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })
    flowerTypeSelect.focus({ preventScroll: true })
  })
})

const form = document.querySelector('#quoteForm')
const message = document.querySelector('#formMessage')
const dateInput = document.querySelector('#date')
const localToday = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
dateInput.min = localToday()
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  dateInput.min = localToday()
  if (!form.reportValidity()) return
  const submit = form.querySelector('[type="submit"]')
  if (submit.disabled) return
  const data = Object.fromEntries(new FormData(form))
  const phone = data.phone.replace(/[\s.()-]/g, '')
  if (!/^(0\d{9}|\+84\d{9})$/.test(phone)) {
    message.textContent = 'Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 chữ số hoặc +84).'
    message.classList.add('error')
    document.querySelector('#phone').focus()
    return
  }
  submit.disabled = true
  submit.textContent = 'ĐANG GỬI…'
  form.setAttribute('aria-busy', 'true')
  message.classList.remove('error')
  message.textContent = 'Đang lưu yêu cầu của bạn…'
  try {
    const response = await fetch('/api/quotes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), signal: AbortSignal.timeout(15000) })
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || 'Chưa gửi được yêu cầu.')
    message.textContent = `Đã lưu yêu cầu. Mã của bạn: ${result.id}. Vui lòng giữ mã này để đối chiếu. Đây là yêu cầu báo giá, chưa phải đơn hàng được xác nhận.`
    form.reset()
  } catch (error) {
    message.textContent = error.name === 'TimeoutError' ? 'Chưa nhận được xác nhận. Vui lòng kiểm tra kết nối trước khi gửi lại để tránh trùng yêu cầu.' : error instanceof TypeError || error instanceof SyntaxError ? 'Không kết nối được dịch vụ báo giá. Thông tin vẫn được giữ để bạn thử lại.' : error.message
    message.classList.add('error')
  } finally {
    submit.disabled = false
    submit.textContent = 'GỬI YÊU CẦU'
    form.removeAttribute('aria-busy')
  }
})

document.querySelector('.top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

initEffects()



