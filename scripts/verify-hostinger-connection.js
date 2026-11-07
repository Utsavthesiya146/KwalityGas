const { PrismaClient } = require('@prisma/client');
const net = require('net');

async function testRemoteDatabase() {
  console.log('=== Checking Remote MySQL Database Configuration ===\n');
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.error('❌ DATABASE_URL is not set in environment.');
    process.exit(1);
  }

  // Parse connection string safely
  let parsedUrl;
  try {
    parsedUrl = new URL(dbUrl.replace(/^mysql:\/\//, 'http://'));
  } catch (err) {
    console.error('❌ DATABASE_URL is not a valid URL format:', err.message);
    process.exit(1);
  }

  const host = parsedUrl.hostname;
  const port = parseInt(parsedUrl.port || '3306', 10);
  const database = parsedUrl.pathname.replace(/^\//, '');
  const username = parsedUrl.username;

  console.log(`Target Host: ${host}`);
  console.log(`Target Port: ${port}`);
  console.log(`Database:    ${database}`);
  console.log(`Username:    ${username}`);
  console.log(`Is Remote:   ${host !== 'localhost' && host !== '127.0.0.1' ? 'YES (Remote Host)' : 'NO (Localhost)'}`);

  // Test 1: TCP Port Reachability
  console.log(`\nTesting TCP connectivity to ${host}:${port}...`);
  const socket = new net.Socket();
  const tcpPromise = new Promise((resolve, reject) => {
    socket.setTimeout(5000);
    socket.connect(port, host, () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('error', (err) => {
      socket.destroy();
      reject(err);
    });
    socket.on('timeout', () => {
      socket.destroy();
      reject(new Error('Connection timed out after 5000ms'));
    });
  });

  try {
    await tcpPromise;
    console.log(`✅ TCP socket connection to ${host}:${port} established successfully.`);
  } catch (err) {
    console.error(`❌ Failed to establish TCP socket connection to ${host}:${port}: ${err.message}`);
    if (host !== 'localhost' && host !== '127.0.0.1') {
      console.log('👉 Ensure remote IP whitelist (%) is enabled in Hostinger Remote MySQL settings.');
    }
  }

  // Test 2: Prisma Client Query
  console.log('\nTesting Prisma ORM authentication and query execution...');
  const prisma = new PrismaClient();
  try {
    const count = await prisma.adminUser.count();
    console.log(`✅ Prisma query successful! Found ${count} admin users in database.`);
    const enquiryCount = await prisma.enquiry.count();
    console.log(`✅ Enquiry table active! Current enquiries stored: ${enquiryCount}`);
  } catch (err) {
    console.error(`❌ Prisma connection failed: ${err.message}`);
  } finally {
    await prisma.$disconnect();
  }

  console.log('\n=== Database Connectivity Verification Complete ===');
}

testRemoteDatabase().catch(console.error);

