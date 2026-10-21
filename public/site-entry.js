// Keep production form submissions on the activated, permanent website address.
if (/^shop-hoa-[a-z0-9-]+-cine-sky-s-projects\.vercel\.app$/.test(location.hostname)) {
  location.replace('https://shop-hoa-hau.vercel.app' + location.pathname + location.search + location.hash)
}
