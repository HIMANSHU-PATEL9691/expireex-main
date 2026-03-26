// Test admin approval and seller login
const http = require('http');
const Admin = require('./models/Admin');
const User = require('./models/User');

async function testApprovalAndLogin() {
  console.log('\n🧪 === SELLER APPROVAL & LOGIN TEST ===\n');

  // Get last created seller
  const seller = await User.findOne({ role: 'seller' }).sort({ _id: -1 });
  
  if (!seller) {
    console.log('❌ No sellers found');
    return;
  }

  console.log('📋 Found seller:', seller.email);
  console.log('📊 Current status:', seller.status);

  // Approve the seller
  console.log('\n1️⃣  Approving seller...');
  await User.findByIdAndUpdate(seller._id, { status: 'approved' });
  const updated = await User.findById(seller._id);
  console.log('✅ Seller approved! Status:', updated.status);

  // Now test login
  console.log('\n2️⃣  Testing seller login after approval...');
  
  const loginData = JSON.stringify({
    email: seller.email,
    password: 'password123'
  });

  const req = http.request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const result = JSON.parse(data);
      if (res.statusCode === 200) {
        console.log('✅ Login successful!');
        console.log('🔐 Token:', result.token.substring(0, 20) + '...');
        console.log('👤 User:', result.user.name);
        console.log('🏪 Shop:', result.user.shopName);
      } else {
        console.log('❌ Login failed:', result);
      }
    });
  });

  req.on('error', err => console.error('🔥 Error:', err.message));
  req.write(loginData);
  req.end();

  // Wait for response
  await new Promise(resolve => setTimeout(resolve, 1000));
}

testApprovalAndLogin();
