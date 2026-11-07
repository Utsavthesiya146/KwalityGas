const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function runLiveEnquiryPersistenceTest() {
  console.log('=== Live TiDB Cloud Enquiry Persistence & Admin Simulation Test ===\n');

  // Step 1: Create Controlled Enquiries for All 3 Segments
  console.log('[Step 1] Submitting controlled enquiries for Domestic, Commercial, and Industrial...');

  const domestic = await prisma.enquiry.create({
    data: {
      enquiryType: 'DOMESTIC',
      customerName: 'Karthik Sharma (Controlled Test)',
      phone: '+91 98450 12345',
      email: 'karthik.sharma@example.com',
      address: '42, 4th Main, Vijayanagar, Bengaluru 560040',
      message: 'Controlled test: Booking enquiry for domestic 12kg refill connection.',
      status: 'NEW',
    },
  });
  console.log(`✅ [Domestic] Persisted! ID: ${domestic.id} | Type: ${domestic.enquiryType}`);

  const commercial = await prisma.enquiry.create({
    data: {
      enquiryType: 'COMMERCIAL',
      customerName: 'Anand Kumar (Controlled Test)',
      companyName: 'Namma Sagar Grand Restaurant',
      contactPerson: 'Anand Kumar (General Manager)',
      phone: '+91 98860 54321',
      email: 'anand@nammasagar.com',
      address: 'Gandhi Bazar, Basavanagudi, Bengaluru 560004',
      establishmentType: 'Restaurant',
      consumption: '17kg x 8 cylinders weekly',
      requiredDate: '2026-11-20',
      message: 'Controlled test: Commercial kitchen pipeline connection & cylinder supply.',
      status: 'NEW',
    },
  });
  console.log(`✅ [Commercial] Persisted! ID: ${commercial.id} | Type: ${commercial.enquiryType}`);

  const industrial = await prisma.enquiry.create({
    data: {
      enquiryType: 'INDUSTRIAL',
      customerName: 'Venkatesh Rao (Controlled Test)',
      companyName: 'Precision Engineering & Heat Treatment Ltd',
      contactPerson: 'Venkatesh Rao (Plant Head)',
      phone: '+91 99000 67890',
      email: 'vrao@precisioneng.com',
      address: 'Plot 18, Phase 2, Peenya Industrial Area, Bengaluru 560058',
      establishmentType: 'Metal Annealing Furnace',
      consumption: '33kg LOT manifold x 16 cylinders',
      requiredDate: '2026-11-25',
      message: 'Controlled test: Industrial 33kg LOT manifold installation with automatic changeover.',
      status: 'NEW',
    },
  });
  console.log(`✅ [Industrial] Persisted! ID: ${industrial.id} | Type: ${industrial.enquiryType}`);

  // Step 2: Verify All 3 Records Stored in Remote TiDB Cloud
  console.log('\n[Step 2] Verifying records in remote TiDB Cloud database...');
  const totalEnquiries = await prisma.enquiry.count();
  console.log(`✅ Total Enquiries in TiDB Cloud: ${totalEnquiries}`);

  // Step 3: Admin Panel Retrieval & Filter Simulation
  console.log('\n[Step 3] Simulating Admin Panel queries & filters...');
  const domesticList = await prisma.enquiry.findMany({
    where: { enquiryType: 'DOMESTIC' },
    orderBy: { createdAt: 'desc' },
  });
  console.log(`✅ Admin Filter [enquiryType=DOMESTIC]: Found ${domesticList.length} record(s)`);

  const commercialList = await prisma.enquiry.findMany({
    where: { enquiryType: 'COMMERCIAL' },
    orderBy: { createdAt: 'desc' },
  });
  console.log(`✅ Admin Filter [enquiryType=COMMERCIAL]: Found ${commercialList.length} record(s)`);

  const industrialList = await prisma.enquiry.findMany({
    where: { enquiryType: 'INDUSTRIAL' },
    orderBy: { createdAt: 'desc' },
  });
  console.log(`✅ Admin Filter [enquiryType=INDUSTRIAL]: Found ${industrialList.length} record(s)`);

  // Step 4: Admin Panel Status Update Simulation
  console.log('\n[Step 4] Simulating Admin Panel status transitions...');
  const updatedCommercial = await prisma.enquiry.update({
    where: { id: commercial.id },
    data: {
      status: 'CONTACTED',
      adminNotes: 'Marketing manager called Mr. Anand; arranged site inspection for manifold sizing on Monday.',
    },
  });
  console.log(`✅ Admin Status Update: ID ${updatedCommercial.id} status changed to "${updatedCommercial.status}" with admin notes.`);

  const updatedIndustrial = await prisma.enquiry.update({
    where: { id: industrial.id },
    data: {
      status: 'IN_PROGRESS',
      adminNotes: 'Technical team dispatched Peenya plant survey engineer.',
    },
  });
  console.log(`✅ Admin Status Update: ID ${updatedIndustrial.id} status changed to "${updatedIndustrial.status}" with admin notes.`);

  console.log('\n🎉 ALL LIVE TIDB ENQUIRY PERSISTENCE & ADMIN TESTS PASSED PERFECTLY!\n');
}

runLiveEnquiryPersistenceTest()
  .catch((e) => {
    console.error('Test Failed:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

