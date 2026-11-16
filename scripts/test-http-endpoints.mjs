import http from 'http';

function testEndpoint(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3005${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, dataLength: data.length });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  // Give server 2 seconds to warm up
  await new Promise(r => setTimeout(r, 2000));
  
  const endpoints = [
    '/',
    '/track-order',
    '/account/login',
    '/admin/login',
    '/admin',
    '/admin/orders',
    '/admin/dealers',
    '/admin/customers',
    '/admin/reports',
  ];

  console.log('Testing HTTP Endpoints on http://localhost:3005:\n');
  for (const ep of endpoints) {
    try {
      const res = await testEndpoint(ep);
      console.log(`[HTTP ${res.statusCode}] ${ep} (Size: ${res.dataLength} bytes)`);
    } catch (err) {
      console.error(`[ERROR] ${ep}:`, err.message);
    }
  }
}

run();

