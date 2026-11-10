const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testOrderPersistence() {
  console.log('--- Testing Safe Order Creation in TiDB / MySQL ---');

  const testOrderNumber = `KWG-ORD-TEST-${Date.now().toString().slice(-5)}`;

  const order = await prisma.order.create({
    data: {
      orderNumber: testOrderNumber,
      customerName: 'Suresh Kumar (Controlled Test)',
      customerPhone: '9845099887',
      customerEmail: 'suresh.test@example.com',
      deliveryAddress: 'No. 12, 10th Cross, Indiranagar, Bengaluru 560038',
      orderType: 'COMMERCIAL',
      subtotal: 5190.00,
      notes: 'Need morning delivery before 11 AM.',
      status: 'NEW',
      items: {
        create: [
          {
            productName: '17.0 Kgs Commercial LPG Cylinder',
            capacity: '17.0 Kgs',
            unitPrice: 2595.00,
            quantity: 2,
            lineTotal: 5190.00,
          }
        ]
      }
    },
    include: { items: true }
  });

  console.log('✅ Order created successfully in DB!');
  console.log(`   Order ID: ${order.id}`);
  console.log(`   Order Number: ${order.orderNumber}`);
  console.log(`   Status: ${order.status}`);
  console.log(`   Items count: ${order.items.length}`);
  console.log(`   Item 1: ${order.items[0].productName} x ${order.items[0].quantity} (₹${order.items[0].lineTotal})`);

  // Verify retrieval
  const retrieved = await prisma.order.findUnique({
    where: { id: order.id },
    include: { items: true }
  });

  console.log('✅ Verified order retrieval from DB!');
  console.log(`   Customer: ${retrieved.customerName} (${retrieved.customerPhone})`);

  // Cleanup test order
  await prisma.order.delete({ where: { id: order.id } });
  console.log('🧹 Cleaned up test order record cleanly.');
}

testOrderPersistence()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
