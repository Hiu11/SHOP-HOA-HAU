export const products = [
  { name: 'Hoa lay ơn đỏ', image: '/images/lay-on-do.jpg', position: 'center 60%', tone: 'warm' },
  { name: 'Hoa lay ơn hồng', image: '/images/lay-on-hong.jpg', position: 'center', tone: 'warm' },
  { name: 'Hoa lay ơn vàng', image: '/images/lay-on-vang-no.jpg', position: 'center 55%', tone: 'warm' },
  { name: 'Hoa lay ơn trắng', image: '/images/lay-on-trang.jpg', position: 'center 35%', tone: 'soft' },
  { name: 'Hoa lay ơn tím', image: '/images/lay-on-tim.jpg', position: 'center', tone: 'soft' },
  { name: 'Hoa lay ơn cam', image: '/images/lay-on-cam.jpg', position: 'center', tone: 'warm' },
  { name: 'Hoa hướng dương', image: '/images/huong-duong-nen-sang.jpg', position: 'center 48%', tone: 'sunflower' }
]

export const flowerNames = [...products.map(product => product.name), 'Hoa lay ơn theo yêu cầu']
