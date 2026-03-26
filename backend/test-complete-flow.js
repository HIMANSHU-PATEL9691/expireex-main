// Complete test flow for seller authentication
const http = require('http');

function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(body)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: body
          });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function testSellerFlow() {
  console.log('\n🧪 === SELLER AUTHENTICATION TEST ===\n');

  // 1. Seller Signup
  console.log('1️⃣  Testing Seller Signup...');
  const timestamp = Date.now();
  const signupResult = await makeRequest({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/signup',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    name: `Test Seller ${timestamp}`,
    email: `seller${timestamp}@test.com`,
    password: 'password123',
    role: 'seller',
    shopName: 'Test Shop'
  });

  if (signupResult.status === 200) {
    console.log('✅ Signup successful');
    console.log('📊 Seller ID:', signupResult.data.user.sellerId);
    console.log('📦 Status:', signupResult.data.user.status);
  } else {
    console.log('❌ Signup failed:', signupResult.data);
    return;
  }

  const sellerEmail = `seller${timestamp}@test.com`;

  // 2. Try login before approval
  console.log('\n2️⃣  Testing Login Before Approval...');
  const loginBeforeResult = await makeRequest({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    email: sellerEmail,
    password: 'password123'
  });

  if (loginBeforeResult.status === 403) {
    console.log('✅ Correctly blocked (seller not approved yet)');
    console.log('📝 Message:', loginBeforeResult.data.msg);
  } else {
    console.log('❓ Unexpected response:', loginBeforeResult);
  }

  // 3. Get all sellers (for manual approval check)
  console.log('\n3️⃣  Checking Seller in Database...');
  const sellersResult = await makeRequest({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/sellers',
    method: 'GET',
    headers: { 'Authorization': 'admin-token' } // This will fail but shows endpoint exists
  });
  console.log('📋 Sellers endpoint status:', sellersResult.status);

  console.log('\n✨ Test flow completed!');
  console.log('📝 Note: To fully test, an admin should approve the seller first.');
}

testSellerFlow().catch(err => console.error('🔥 Error:', err.message));
