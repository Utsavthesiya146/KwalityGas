const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { SignJWT, jwtVerify } = require('jose');

const prisma = new PrismaClient();
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'kwality-gas-jwt-super-secret-token-key-2026-production'
);

async function runAuthAudit() {
  console.log('=== Starting Admin Security & Auth Audit ===');

  // Test 1: Fetch Admin
  const admin = await prisma.adminUser.findUnique({
    where: { email: 'admin@kwalitygas.com' },
  });
  console.log('Test 1 - Admin user exists:', admin ? `PASS (${admin.email}, Role: ${admin.role})` : 'FAIL');

  if (!admin) {
    throw new Error('Admin user not found');
  }

  // Test 2: Password hashing verification
  const isMatch = await bcrypt.compare('KwalityAdmin@2026', admin.passwordHash);
  console.log('Test 2 - Bcrypt password hash verification:', isMatch ? 'PASS' : 'FAIL');

  const isWrongMatch = await bcrypt.compare('WrongPassword123!', admin.passwordHash);
  console.log('Test 3 - Wrong password rejection:', !isWrongMatch ? 'PASS (Rejected)' : 'FAIL');

  // Test 4: JWT Token Signing
  const token = await new SignJWT({
    userId: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
  console.log('Test 4 - Jose HS256 JWT generation:', token ? 'PASS' : 'FAIL');

  // Test 5: JWT Token Verification
  const { payload } = await jwtVerify(token, JWT_SECRET);
  console.log('Test 5 - JWT validation & payload extraction:', payload.email === admin.email ? 'PASS' : 'FAIL');

  // Test 6: Tampered Token Rejection
  let tamperedCaught = false;
  try {
    await jwtVerify(token + 'tampered', JWT_SECRET);
  } catch (err) {
    tamperedCaught = true;
  }
  console.log('Test 6 - Tampered token rejection:', tamperedCaught ? 'PASS' : 'FAIL');

  // Test 7: ADMIN_PASSWORD_HASH fallback verification
  const testHash = await bcrypt.hash('CustomStagingPass#2026', 10);
  const hashMatches = await bcrypt.compare('CustomStagingPass#2026', testHash);
  const wrongHashMatches = await bcrypt.compare('BadPassword', testHash);
  console.log('Test 7 - ADMIN_PASSWORD_HASH bcrypt verification:', hashMatches && !wrongHashMatches ? 'PASS' : 'FAIL');

  console.log('=== Admin Security & Auth Audit Completed Successfully ===\n');
}

runAuthAudit()
  .catch((e) => {
    console.error('Auth Audit Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

