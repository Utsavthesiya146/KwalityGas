async function testAllSegments() {
  const url = 'https://kwalitygas.vercel.app/api/enquiry';
  const tests = [
    {
      enquiryType: 'DOMESTIC',
      customerName: 'Controlled Test Domestic Customer',
      phone: '+919876543210',
      email: 'domestic-test@kwalitygas.com',
      address: 'Vijayanagar, Bangalore',
      message: 'Controlled test for domestic 12kg cylinder booking.',
    },
    {
      enquiryType: 'COMMERCIAL',
      customerName: 'Controlled Test Restaurant Group',
      companyName: 'Spice Route Kitchens',
      contactPerson: 'Mr. Operations Head',
      phone: '+919876543211',
      email: 'commercial-test@kwalitygas.com',
      establishmentType: 'Restaurant',
      consumption: '17kg x 6 cylinders weekly',
      requiredDate: '2026-11-20',
      message: 'Controlled test for commercial 17kg/21kg kitchen supply.',
    },
    {
      enquiryType: 'INDUSTRIAL',
      customerName: 'Controlled Test Precision Forgings Ltd',
      companyName: 'Precision Forgings Ltd',
      contactPerson: 'General Manager Plant',
      phone: '+919876543212',
      email: 'industrial-test@kwalitygas.com',
      establishmentType: 'Automotive Components',
      consumption: '33kg LOT manifold x 12 cylinders',
      requiredDate: '2026-11-25',
      message: 'Controlled test for industrial 33kg manifold bank consultation.',
    },
  ];

  console.log('=== Testing All 3 Segments Against Live Vercel Production ===\n');
  for (const t of tests) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(t),
      });
      const data = await res.json();
      console.log(`[${t.enquiryType}] Status: ${res.status} | PersistedTo: ${data.persistedTo || 'N/A'} | ID: ${data.enquiryId || 'N/A'}`);
    } catch (err) {
      console.error(`[${t.enquiryType}] Error:`, err.message);
    }
  }
  console.log('\n=== Segment Submission Verification Finished ===');
}

testAllSegments();

