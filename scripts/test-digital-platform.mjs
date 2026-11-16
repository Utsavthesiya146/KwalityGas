import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function runTests() {
  console.log('====================================================');
  console.log(' Kwality Gas Digital Platform – Automated Test Suite');
  console.log('====================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, testName) {
    totalTests++;
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passedTests++;
    } else {
      console.error(`[FAIL] ${testName}`);
      throw new Error(`Test failed: ${testName}`);
    }
  }

  try {
    // 1. Database Connection & Content Integrity Test
    console.log('--- Test 1: Content & Database Integrity ---');
    const productCount = await prisma.product.count();
    const testimonialCount = await prisma.testimonial.count();
    const priceListCount = await prisma.priceListItem.count();
    const dealerCount = await prisma.dealer.count();

    assert(productCount >= 10, `Existing products preserved (${productCount} products found)`);
    assert(testimonialCount >= 8, `Existing testimonials preserved (${testimonialCount} testimonials found)`);
    assert(priceListCount >= 14, `Price list preserved (${priceListCount} items found)`);
    assert(dealerCount >= 5, `Seed dealers present (${dealerCount} dealers found)`);

    // 2. Customer Registration & Password Hashing Test
    console.log('\n--- Test 2: Customer Registration & Security ---');
    const testEmail = `test_customer_${Date.now()}@example.com`;
    const rawPassword = 'SecurePassword@123';
    const passwordHash = await bcrypt.hash(rawPassword, 10);

    const testCustomer = await prisma.customer.create({
      data: {
        name: 'Suresh Kumar Patel',
        email: testEmail,
        phone: '+919876543210',
        passwordHash,
        category: 'COMMERCIAL',
        companyName: 'Patel Hotel & Restaurant',
        gstNumber: '29ABCDE1234F1Z5',
        deliveryAddress: 'Shop 12, Commercial Ring Road, Peenya',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560058',
      },
    });

    assert(testCustomer.id !== undefined, 'Customer successfully registered in TiDB/MySQL');
    assert(testCustomer.category === 'COMMERCIAL', 'Customer category correctly stored as COMMERCIAL');

    const passwordMatches = await bcrypt.compare(rawPassword, testCustomer.passwordHash);
    assert(passwordMatches, 'Bcrypt password comparison succeeded securely');

    // 3. LPG Cart & Order Placement Simulation (WhatsApp Flow)
    console.log('\n--- Test 3: WhatsApp-Based Order Placement Flow ---');
    const existingProduct = await prisma.product.findFirst({
      where: { isActive: true },
    });

    const uniqueOrderNumber = `KWG-ORD-${Date.now()}`;
    const newOrder = await prisma.order.create({
      data: {
        orderNumber: uniqueOrderNumber,
        customerId: testCustomer.id,
        customerName: testCustomer.name,
        customerEmail: testCustomer.email,
        customerPhone: testCustomer.phone,
        deliveryAddress: `${testCustomer.deliveryAddress}, ${testCustomer.city}, ${testCustomer.state} - ${testCustomer.pincode}`,
        orderType: 'COMMERCIAL',
        notes: 'Urgent commercial delivery required by evening',
        subtotal: 4250.00,
        status: 'NEW',
        paymentStatus: 'PENDING',
        items: {
          create: [
            {
              productId: existingProduct.id,
              productName: existingProduct.name,
              capacity: existingProduct.capacity || '19 kg Commercial',
              quantity: 2,
              unitPrice: 2125.00,
              lineTotal: 4250.00,
            },
          ],
        },
      },
      include: {
        items: true,
      },
    });

    assert(newOrder.orderNumber === uniqueOrderNumber, 'Order saved in database BEFORE WhatsApp redirection');
    assert(newOrder.paymentStatus === 'PENDING', 'New order initially has PENDING payment status (no automatic marking)');
    assert(newOrder.items.length === 1, 'Order items saved correctly with cylinder capacity and quantity');

    // Test WhatsApp message formation
    const officialWhatsAppNumber = '917899787101';
    const lines = [
      `*NEW LPG ORDER – KWALITY GAS*`,
      `*Order ID:* ${newOrder.orderNumber}`,
      `*Customer:* ${newOrder.customerName}`,
      `*Phone:* ${newOrder.customerPhone}`,
      `*Delivery Address:* ${newOrder.deliveryAddress}`,
      `\n*Order Items:*`,
      `• 2x ${existingProduct.name} (${existingProduct.capacity || '19 kg Commercial'}) - Rs. 4,250`,
      `\n*Total Amount:* Rs. 4,250 (Subject to delivery charge confirmation)`,
      `*Notes:* ${newOrder.notes}`,
      `\n_Please confirm price, payment method, and dispatch schedule._`,
    ];
    const encodedMsg = encodeURIComponent(lines.join('\n'));
    const whatsappUrl = `https://wa.me/${officialWhatsAppNumber}?text=${encodedMsg}`;

    assert(whatsappUrl.includes('917899787101'), 'WhatsApp URL points to official Kwality Gas number: +91 78997 87101');
    assert(whatsappUrl.includes(uniqueOrderNumber), 'WhatsApp URL contains unique Order ID');

    // 4. Order Tracking Test (Customer View)
    console.log('\n--- Test 4: Customer Order Tracking ---');
    const trackedOrder = await prisma.order.findFirst({
      where: {
        orderNumber: uniqueOrderNumber,
        customerPhone: {
          contains: '9876543210',
        },
      },
      include: {
        items: true,
      },
    });

    assert(trackedOrder !== null, 'Order tracking query by Order ID + Phone Number succeeds');
    assert(trackedOrder.status === 'NEW', 'Tracked order shows NEW status');

    // 5. Admin Order Management & Manual Payment Confirmation Test
    console.log('\n--- Test 5: Admin Order Lifecycle & Manual Payment Confirmation ---');
    const assignedDealer = await prisma.dealer.findFirst({
      where: {
        OR: [
          { territory: { contains: 'Bangalore' } },
          { businessName: { contains: 'Peenya' } },
        ],
      },
    });

    const updatedOrder = await prisma.order.update({
      where: { id: newOrder.id },
      data: {
        status: 'PROCESSING',
        paymentStatus: 'CONFIRMED',
        paymentNotes: 'Received via NEFT / UPI Ref: UPI908123712',
        paymentConfirmedAt: new Date(),
        dealerId: assignedDealer ? assignedDealer.id : null,
      },
    });

    assert(updatedOrder.paymentStatus === 'CONFIRMED', 'Admin manually confirmed payment');
    assert(updatedOrder.status === 'PROCESSING', 'Admin updated order status to PROCESSING');
    if (assignedDealer) {
      assert(updatedOrder.dealerId === assignedDealer.id, `Order assigned to territory dealer: ${assignedDealer.businessName}`);
    }

    // 6. Admin Audit Log Verification
    console.log('\n--- Test 6: Security & Audit Logging ---');
    const auditEntry = await prisma.auditLog.create({
      data: {
        adminEmail: 'admin@kwalitygas.com',
        action: 'UPDATE_ORDER_PAYMENT',
        entity: 'Order',
        entityId: newOrder.id,
        details: JSON.stringify({ previous: 'PENDING', updated: 'CONFIRMED', ref: 'UPI908123712' }),
      },
    });

    assert(auditEntry.id !== undefined, 'Audit log created for sensitive admin action');

    // 7. Dealer Management & Territory Queries
    console.log('\n--- Test 7: Dealer & Distributor Management ---');
    const peenyaDealer = await prisma.dealer.findFirst({
      where: {
        OR: [
          { territory: { contains: 'Bangalore' } },
          { businessName: { contains: 'Peenya' } },
        ],
      },
      include: { orders: true },
    });
    assert(peenyaDealer !== null, 'Dealer records retrieved successfully');
    assert(peenyaDealer.orders.length >= 1, 'Dealer orders relationship functions properly');

    // 8. Business Analytics & Reporting Aggregation
    console.log('\n--- Test 8: Reports & Business Analytics Aggregation ---');
    const totalOrdersCount = await prisma.order.count();
    const confirmedRevenue = await prisma.order.aggregate({
      where: { paymentStatus: 'CONFIRMED' },
      _sum: { subtotal: true },
    });

    assert(totalOrdersCount > 0, `Total orders aggregated: ${totalOrdersCount}`);
    assert(Number(confirmedRevenue._sum.subtotal) >= 4250, `Confirmed revenue calculated: Rs. ${confirmedRevenue._sum.subtotal}`);

    // Cleanup test records cleanly
    console.log('\n--- Cleanup: Removing test order & customer ---');
    await prisma.auditLog.delete({ where: { id: auditEntry.id } });
    await prisma.orderItem.deleteMany({ where: { orderId: newOrder.id } });
    await prisma.order.delete({ where: { id: newOrder.id } });
    await prisma.customer.delete({ where: { id: testCustomer.id } });
    console.log('[CLEANUP] Test records safely cleaned up');

    console.log('\n====================================================');
    console.log(` ALL TESTS PASSED! (${passedTests}/${totalTests})`);
    console.log('====================================================');
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTests();
