const routes = [
  '/',
  '/about',
  '/products',
  '/cylinders',
  '/gas-water-heater',
  '/safety-devices',
  '/accessories',
  '/domestic',
  '/commercial',
  '/industrial',
  '/services',
  '/price-list',
  '/safety-features',
  '/testimonials',
  '/gallery',
  '/group-company',
  '/contact',
  '/contact/domestic',
  '/contact/commercial',
  '/contact/industrial',
  '/privacy-policy',
  '/admin/login'
];

async function checkRoutes() {
  const base = 'https://kwalitygas.vercel.app';
  console.log('Testing live routes on Vercel: ' + base);
  let failed = 0;
  for (const r of routes) {
    try {
      const res = await fetch(base + r, { redirect: 'follow' });
      const ok = res.status === 200;
      if (!ok) failed++;
      console.log(`${ok ? 'PASS' : 'FAIL'} [${res.status}] ${r}`);
    } catch (e) {
      failed++;
      console.log(`ERROR [FAIL] ${r} - ${e.message}`);
    }
  }
  console.log(`\nCompleted: ${routes.length - failed}/${routes.length} routes online.`);
}

checkRoutes().catch(console.error);
