const { PrismaClient } = require('@prisma/client');
const net = require('net');

async function verifyTiDBCloud() {
  console.log('=== TiDB Cloud Serverless Diagnostic & Connectivity Verification ===\n');

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('❌ Error: DATABASE_URL is not set in environment.');
    console.log('👉 Please set DATABASE_URL in your environment or Render Dashboard.');
    console.log('Format: mysql://<user>:<password>@gateway01.<region>.prod.aws.tidbcloud.com:4000/<dbname>?sslaccept=strict');
    process.exit(1);
  }

  // Parse connection string safely without revealing secrets
  let parsedUrl;
  try {
    parsedUrl = new URL(dbUrl.replace(/^mysql:\/\//, 'http://'));
  } catch (err) {
    console.error('❌ Error: DATABASE_URL is not a valid URL format:', err.message);
    process.exit(1);
  }

  const host = parsedUrl.hostname;
  const port = parseInt(parsedUrl.port || '4000', 10);
  const database = parsedUrl.pathname.replace(/^\//, '');
  const username = parsedUrl.username;

  console.log(`[Configuration] Host:     ${host}`);
  console.log(`[Configuration] Port:     ${port}`);
  console.log(`[Configuration] Database: ${database}`);
  console.log(`[Configuration] User:     ${username}`);
  console.log(`[Configuration] SSL Mode: ${dbUrl.includes('sslaccept=strict') ? 'Strict (TLS Verified)' : 'Default'}`);

  // Test 1: TCP Port 4000 Reachability
  console.log(`\n[Step 1] Testing TCP socket connection to ${host}:${port}...`);
  const socket = new net.Socket();
  const tcpPromise = new Promise((resolve, reject) => {
    socket.setTimeout(8000);
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
      reject(new Error('Connection timed out after 8000ms. Check cluster status and firewall.'));
    });
  });

  try {
    await tcpPromise;
    console.log(`✅ [Step 1] TCP socket connection established to TiDB Gateway (${host}:${port}).`);
  } catch (err) {
    console.error(`❌ [Step 1] TCP connection failed: ${err.message}`);
    process.exit(1);
  }

  // Test 2: Prisma ORM Query & Cluster Version
  console.log('\n[Step 2] Testing Prisma ORM query against TiDB Cloud...');
  const prisma = new PrismaClient();
  try {
    const rawResult = await prisma.$queryRawUnsafe('SELECT VERSION() as version');
    console.log(`✅ [Step 2] Connected! Engine Version: ${JSON.stringify(rawResult)}`);

    // Check tables
    const adminCount = await prisma.adminUser.count();
    console.log(`✅ [Step 3] admin_users table accessible! Count: ${adminCount}`);

    const productCount = await prisma.product.count();
    console.log(`✅ [Step 4] products table accessible! Count: ${productCount}`);

    const enquiryCount = await prisma.enquiry.count();
    console.log(`✅ [Step 5] enquiries table accessible! Count: ${enquiryCount}`);

    console.log('\n🎉 ALL TIDB CLOUD CHECKS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error(`❌ [Step 2] Prisma query failed: ${err.message}`);
    console.log('\nTroubleshooting Checklist:');
    console.log('1. Ensure your TiDB Cloud cluster is ACTIVE (not paused).');
    console.log('2. Ensure the database name in the URL exists in TiDB Cloud.');
    console.log('3. Run `npm run db:migrate:deploy` to apply the initial schema.');
  } finally {
    await prisma.$disconnect();
  }
}

verifyTiDBCloud().catch(console.error);

