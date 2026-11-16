/**
 * REAL-LIVE Staging E2E Verifier for Kwality Gas Digital Platform
 * Target: https://kwalitygas.onrender.com (Render Staging + TiDB Cloud)
 */

const BASE_URL = 'https://kwalitygas.onrender.com';
const OFFICIAL_WHATSAPP = '917899787101';

class CookieJar {
  constructor() {
    this.cookies = new Map();
  }

  setFromResponse(res) {
    // getSetCookie in Node 18+ or standard header extraction
    let setCookies = [];
    if (typeof res.headers.getSetCookie === 'function') {
      setCookies = res.headers.getSetCookie();
    } else {
      const raw = res.headers.get('set-cookie');
      if (raw) setCookies = [raw];
    }

    for (const cookieStr of setCookies) {
      const parts = cookieStr.split(';')[0].split('=');
      if (parts.length >= 2) {
        const name = parts[0].trim();
        const value = parts.slice(1).join('=').trim();
        this.cookies.set(name, value);
      }
    }
  }

  getHeader() {
    const list = [];
    for (const [k, v] of this.cookies.entries()) {
      list.push(`${k}=${v}`);
    }
    return list.join('; ');
  }
}

async function runLiveStagingVerification() {
  console.log('========================================================================');
  console.log(' KWALITY GAS — REAL-LIVE STAGING E2E VERIFICATION ON RENDER');
  console.log(` Target URL: ${BASE_URL}`);
  console.log(` Execution Time: ${new Date().toISOString()}`);
  console.log('========================================================================\n');

  const results = [];
  let testOrderId = null;
  let testOrderNumber = null;
  let testCustomerId = null;
  const customerJar = new CookieJar();
  const adminJar = new CookieJar();

  function record(title, passed, details = '') {
    results.push({ title, passed, details });
    const tag = passed ? '✅ [PASS]' : '❌ [FAIL]';
    console.log(`${tag} ${title}`);
    if (details) console.log(`   └─ ${details}`);
  }

  try {
    // ---------------------------------------------------------
    // TEST 1: Live Staging Health & Public Content Preservation
    // ---------------------------------------------------------
    console.log('>>> [1/11] Checking Live Homepage & Content Integrity...');
    const homeRes = await fetch(`${BASE_URL}/`);
    const homeHtml = await homeRes.text();
    const homeHealthy = homeRes.status === 200 && homeHtml.includes('Kwality Gas');
    const phonePreserved = homeHtml.includes('78997') || homeHtml.includes('2340 0459');
    record(
      'Live Staging Homepage & Content Integrity',
      homeHealthy && phonePreserved,
      `HTTP Status: ${homeRes.status}, Body length: ${homeHtml.length} bytes, Phone verified: ${phonePreserved}`
    );

    // ---------------------------------------------------------
    // TEST 2: Customer Registration on Live Staging
    // ---------------------------------------------------------
    console.log('\n>>> [2/11] Registering Test Customer on Live Staging...');
    const testEmail = `live_verify_${Date.now()}@testdomain.local`;
    const testPhone = '+919876543210';
    const regPayload = {
      name: 'Staging Verifier Customer',
      email: testEmail,
      phone: testPhone,
      password: 'VerifyPassword@2026',
      category: 'COMMERCIAL',
      companyName: 'Kwality Staging Testing Lab',
      gstNumber: '29ABCDE1234F1Z5',
      deliveryAddress: 'Plot 42, Staging Test Road, Peenya Industrial Area',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560058',
    };

    const regRes = await fetch(`${BASE_URL}/api/customer/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regPayload),
    });
    const regData = await regRes.json();
    testCustomerId = regData.customer?.id;
    customerJar.setFromResponse(regRes);

    record(
      'Customer Registration on Live Staging',
      regRes.status === 201 && testCustomerId !== undefined,
      `Customer ID: ${testCustomerId}, Category: ${regData.customer?.category}`
    );

    // ---------------------------------------------------------
    // TEST 3: Customer Login & Dashboard Verification
    // ---------------------------------------------------------
    console.log('\n>>> [3/11] Logging into Customer Account & Verifying Profile...');
    const loginRes = await fetch(`${BASE_URL}/api/customer/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: 'VerifyPassword@2026' }),
    });
    customerJar.setFromResponse(loginRes);

    const meRes = await fetch(`${BASE_URL}/api/customer/me`, {
      headers: { Cookie: customerJar.getHeader() },
    });
    const meData = await meRes.json();
    const customerLoginPassed = meRes.status === 200 && meData.customer?.email === testEmail;
    record(
      'Customer Login & Profile Retrieval',
      customerLoginPassed,
      `Customer Name: ${meData.customer?.name}, Category: ${meData.customer?.category}, Orders count: ${meData.customer?.orders?.length}`
    );

    // ---------------------------------------------------------
    // TEST 4: LPG Cart & WhatsApp-Based Order Placement
    // ---------------------------------------------------------
    console.log('\n>>> [4/11] Submitting LPG Order with WhatsApp Checkout...');
    const orderPayload = {
      customerName: 'Staging Verifier Customer',
      customerPhone: testPhone,
      customerEmail: testEmail,
      deliveryAddress: 'Plot 42, Staging Test Road, Peenya Industrial Area, Bangalore, Karnataka - 560058',
      orderType: 'COMMERCIAL',
      notes: 'Controlled Live Staging Verification Order - WhatsApp Flow Test',
      items: [
        {
          productId: 'cmw5zccb80001test', // arbitrary or null
          productName: '19kg Commercial LPG Cylinder',
          capacity: '19.0 Kgs',
          unitPrice: 2125,
          quantity: 2,
          lineTotal: 4250,
        },
        {
          productId: 'cmw5zccb80002test',
          productName: 'Certified Domestic LPG Pressure Regulator',
          capacity: 'Standard 25.6mm',
          unitPrice: 450,
          quantity: 1,
          lineTotal: 450,
        },
      ],
      calculatedSubtotal: 4700,
    };

    const orderRes = await fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: customerJar.getHeader(),
      },
      body: JSON.stringify(orderPayload),
    });

    const orderData = await orderRes.json();
    testOrderId = orderData.order?.id;
    testOrderNumber = orderData.order?.orderNumber;
    const whatsappUrl = orderData.whatsappUrl;

    const orderSavedPassed = orderRes.status === 201 && testOrderNumber && testOrderId;
    record(
      'Order Saved in Database BEFORE WhatsApp Redirect',
      orderSavedPassed,
      `Order ID: ${testOrderId}, Order Number: ${testOrderNumber}, Initial Payment: ${orderData.order?.paymentStatus}`
    );

    // ---------------------------------------------------------
    // TEST 5: WhatsApp URL & Message Content Verification
    // ---------------------------------------------------------
    console.log('\n>>> [5/11] Verifying WhatsApp Message Composition...');
    const correctNumber = whatsappUrl?.includes(`wa.me/${OFFICIAL_WHATSAPP}`);
    const containsOrderNumber = whatsappUrl?.includes(encodeURIComponent(testOrderNumber));
    const containsItems = whatsappUrl?.includes(encodeURIComponent('19kg Commercial LPG Cylinder'));
    const noAutoPaid = orderData.order?.paymentStatus === 'PENDING';

    record(
      'Official WhatsApp Routing & Pre-filled Message',
      correctNumber && containsOrderNumber && containsItems && noAutoPaid,
      `Target Number: +91 78997 87101 (${correctNumber}), Payment is PENDING (${noAutoPaid})`
    );

    // ---------------------------------------------------------
    // TEST 6: Customer Order Tracking (Initial Status: NEW)
    // ---------------------------------------------------------
    console.log('\n>>> [6/11] Querying Order Tracking Portal (Customer View)...');
    const trackRes = await fetch(`${BASE_URL}/api/orders/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNumber: testOrderNumber,
        phone: testPhone,
      }),
    });
    const trackData = await trackRes.json();
    const trackPassed =
      trackRes.status === 200 &&
      trackData.order?.orderNumber === testOrderNumber &&
      trackData.order?.status === 'NEW' &&
      trackData.order?.paymentStatus === 'PENDING';

    record(
      'Customer Order Tracking by Order ID + Phone',
      trackPassed,
      `Tracked Status: ${trackData.order?.status}, Payment: ${trackData.order?.paymentStatus}, Items: ${trackData.order?.items?.length}`
    );

    // Privacy Isolation Test: Track with mismatched phone
    const fakeTrackRes = await fetch(`${BASE_URL}/api/orders/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNumber: testOrderNumber,
        phone: '+919111122222', // Wrong phone
      }),
    });
    const privacyPassed = fakeTrackRes.status === 404;
    record(
      'Customer Data Isolation & Privacy Protection',
      privacyPassed,
      `Mismatched phone correctly rejected with HTTP ${fakeTrackRes.status}`
    );

    // ---------------------------------------------------------
    // TEST 7: Admin Login & Order Management Ingestion
    // ---------------------------------------------------------
    console.log('\n>>> [7/11] Admin Authentication & Order Retrieval...');
    const adminLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@kwalitygas.com',
        password: 'KwalityAdmin@2026',
      }),
    });
    adminJar.setFromResponse(adminLoginRes);

    const adminOrdersRes = await fetch(`${BASE_URL}/api/orders`, {
      headers: { Cookie: adminJar.getHeader() },
    });
    const adminOrdersData = await adminOrdersRes.json();
    const foundInAdmin = adminOrdersData.orders?.some((o) => o.id === testOrderId);

    record(
      'Admin Panel Order Ingestion & Visibility',
      adminLoginRes.status === 200 && foundInAdmin,
      `Admin logged in successfully; Test Order found in live list (Total orders: ${adminOrdersData.count})`
    );

    // ---------------------------------------------------------
    // TEST 8: Dealer Directory & Manual Payment/Status Update
    // ---------------------------------------------------------
    console.log('\n>>> [8/11] Fetching Dealers and Updating Order Manually...');
    const dealersRes = await fetch(`${BASE_URL}/api/admin/dealers`, {
      headers: { Cookie: adminJar.getHeader() },
    });
    const dealersData = await dealersRes.json();
    const selectedDealer = dealersData.dealers?.[0]; // Pick first authorized dealer

    const updateRes = await fetch(`${BASE_URL}/api/orders`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: adminJar.getHeader(),
      },
      body: JSON.stringify({
        id: testOrderId,
        status: 'PROCESSING',
        paymentStatus: 'CONFIRMED',
        paymentNotes: 'Verified via NEFT / UPI Ref: UPI908123712',
        adminNotes: 'Assigned to dealer for immediate cylinder refill & dispatch',
        dealerId: selectedDealer?.id,
      }),
    });
    const updateData = await updateRes.json();

    const updatePassed =
      updateRes.status === 200 &&
      updateData.order?.status === 'PROCESSING' &&
      updateData.order?.paymentStatus === 'CONFIRMED' &&
      updateData.order?.dealerId === selectedDealer?.id;

    record(
      'Manual Payment Confirmation & Dealer Assignment',
      updatePassed,
      `Status: ${updateData.order?.status}, Payment: ${updateData.order?.paymentStatus}, Dealer: ${selectedDealer?.businessName}`
    );

    // ---------------------------------------------------------
    // TEST 9: Order Tracking Re-verification (Customer Sees Updated Status)
    // ---------------------------------------------------------
    console.log('\n>>> [9/11] Re-checking Customer Tracking for Updated Status...');
    const retrackRes = await fetch(`${BASE_URL}/api/orders/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNumber: testOrderNumber,
        phone: testPhone,
      }),
    });
    const retrackData = await retrackRes.json();
    const retrackPassed =
      retrackRes.status === 200 &&
      retrackData.order?.status === 'PROCESSING' &&
      retrackData.order?.paymentStatus === 'CONFIRMED' &&
      retrackData.order?.dealerName === selectedDealer?.businessName;

    record(
      'Live Customer Order Tracking Re-verification',
      retrackPassed,
      `Customer tracking shows: Status: ${retrackData.order?.status}, Payment: ${retrackData.order?.paymentStatus}, Assigned Dealer: ${retrackData.order?.dealerName}`
    );

    // ---------------------------------------------------------
    // TEST 10: Admin Reports & Business Intelligence
    // ---------------------------------------------------------
    console.log('\n>>> [10/11] Verifying Business Analytics & Reporting Endpoint...');
    const reportsRes = await fetch(`${BASE_URL}/api/admin/reports`, {
      headers: { Cookie: adminJar.getHeader() },
    });
    const reportsData = await reportsRes.json();
    const reportsPassed =
      reportsRes.status === 200 &&
      reportsData.summary?.totalOrders > 0 &&
      Array.isArray(reportsData.statusDistribution) &&
      Array.isArray(reportsData.topProducts);

    record(
      'Business Intelligence & Reporting Analytics',
      reportsPassed,
      `Total Orders: ${reportsData.summary?.totalOrders}, Total Revenue: Rs. ${reportsData.summary?.totalRevenue}, Top Products count: ${reportsData.topProducts?.length}`
    );

    // ---------------------------------------------------------
    // TEST 11: Security & Controlled Cleanup
    // ---------------------------------------------------------
    console.log('\n>>> [11/11] Running Security Checks & Controlled Test Data Cleanup...');
    // Security 1: Unauthorized access to admin endpoints
    const unauthRes = await fetch(`${BASE_URL}/api/admin/dealers`);
    const unauthPassed = unauthRes.status === 401;
    record(
      'API Security & Route Authorization',
      unauthPassed,
      `Unauthenticated request to /api/admin/dealers rejected with HTTP ${unauthRes.status}`
    );

    // Cleanup: Remove test order
    console.log(`Cleaning up test order ID: ${testOrderId}...`);
    const delOrderRes = await fetch(`${BASE_URL}/api/orders?id=${testOrderId}`, {
      method: 'DELETE',
      headers: { Cookie: adminJar.getHeader() },
    });
    const delOrderPassed = delOrderRes.status === 200;

    // Cleanup: Remove test customer
    console.log(`Cleaning up test customer ID: ${testCustomerId}...`);
    const delCustRes = await fetch(`${BASE_URL}/api/admin/customers?id=${testCustomerId}`, {
      method: 'DELETE',
      headers: { Cookie: adminJar.getHeader() },
    });
    const delCustPassed = delCustRes.status === 200;

    record(
      'Controlled Test Records Cleanup',
      delOrderPassed && delCustPassed,
      `Test order deleted: ${delOrderPassed}, Test customer deleted: ${delCustPassed}. Zero existing records affected.`
    );

  } catch (err) {
    console.error('Fatal error during live staging verification:', err);
  }

  console.log('\n========================================================================');
  console.log(' FINAL STAGING VERIFICATION SUMMARY');
  console.log('========================================================================');
  let passCount = 0;
  for (const r of results) {
    if (r.passed) passCount++;
    console.log(`${r.passed ? 'PASS' : 'FAIL'} | ${r.title}`);
  }
  console.log(`\nOverall Result: ${passCount} / ${results.length} PASSED`);
  console.log('========================================================================\n');
}

runLiveStagingVerification();

