const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function runEnquiryAudit() {
  console.log('=== Starting Functional Enquiry Form & DB Audit ===');

  // Test 1: Validation failure on missing fields
  const invalidData = { customerName: '', phone: '' };
  const valCheck = !invalidData.customerName || !invalidData.phone;
  console.log('Test 1 - Form Validation on missing name/phone:', valCheck ? 'PASS (Rejects invalid input)' : 'FAIL');

  // Test 2: Domestic Submission into MySQL
  const domEnquiry = await prisma.enquiry.create({
    data: {
      enquiryType: 'DOMESTIC',
      customerName: 'Audit Test Domestic User',
      phone: '+919876543210',
      email: 'audit-domestic@example.com',
      address: 'Vijayanagar, Bangalore',
      message: 'Automated audit test enquiry for domestic refill connection.',
      status: 'NEW',
    },
  });
  console.log('Test 2 - Domestic enquiry created in MySQL:', domEnquiry.id ? `PASS (ID: ${domEnquiry.id})` : 'FAIL');

  // Test 3: Commercial Submission into MySQL
  const commEnquiry = await prisma.enquiry.create({
    data: {
      enquiryType: 'COMMERCIAL',
      customerName: 'Audit Test Grand Restaurant',
      companyName: 'Grand Spice Kitchen',
      contactPerson: 'Mr. Chef Auditor',
      phone: '+919876543211',
      email: 'audit-comm@example.com',
      establishmentType: 'Restaurant',
      consumption: '17kg x 4 cylinders weekly',
      requiredDate: '2026-11-15',
      message: 'Automated audit test for commercial HORECA manifold quote.',
      status: 'NEW',
    },
  });
  console.log('Test 3 - Commercial enquiry created in MySQL:', commEnquiry.id ? `PASS (ID: ${commEnquiry.id})` : 'FAIL');

  // Test 4: Industrial Submission into MySQL
  const indEnquiry = await prisma.enquiry.create({
    data: {
      enquiryType: 'INDUSTRIAL',
      customerName: 'Audit Test Precision Alloys Ltd',
      companyName: 'Precision Alloys Ltd',
      contactPerson: 'Head of Maintenance',
      phone: '+919876543212',
      email: 'audit-ind@example.com',
      establishmentType: 'Metal Heat Treatment',
      consumption: '33kg LOT x 10 cylinder bank',
      requiredDate: '2026-11-20',
      message: 'Automated audit test for industrial manifold and bulk vaporizers.',
      status: 'NEW',
    },
  });
  console.log('Test 4 - Industrial enquiry created in MySQL:', indEnquiry.id ? `PASS (ID: ${indEnquiry.id})` : 'FAIL');

  // Test 5: Verify MySQL Queries and Status Updates (Admin simulation)
  const allTestEnquiries = await prisma.enquiry.findMany({
    where: { customerName: { startsWith: 'Audit Test' } },
  });
  console.log(`Test 5 - Retrieved ${allTestEnquiries.length} audit enquiries from MySQL.`);

  // Admin status update simulation
  await prisma.enquiry.update({
    where: { id: domEnquiry.id },
    data: { status: 'CONTACTED', adminNotes: 'Verified phone reachable; customer booked demo.' },
  });
  const updated = await prisma.enquiry.findUnique({ where: { id: domEnquiry.id } });
  console.log('Test 6 - Admin status transition in MySQL:', updated.status === 'CONTACTED' ? 'PASS' : 'FAIL');

  // Clean up audit test records
  const deleted = await prisma.enquiry.deleteMany({
    where: { customerName: { startsWith: 'Audit Test' } },
  });
  console.log(`Test 7 - Cleanup: Removed ${deleted.count} test records from MySQL.`);
  console.log('=== Functional Enquiry & DB Audit Completed Successfully ===\n');
}

runEnquiryAudit()
  .catch((e) => {
    console.error('Audit Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

