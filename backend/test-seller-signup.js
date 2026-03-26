// Test script for seller authentication
const http = require('http');

const testSeller = {
  name: "John Seller",
  email: "john@seller.com",
  password: "password123",
  role: "seller",
  shopName: "John's Fresh Mart"
};

const postData = JSON.stringify(testSeller);

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/signup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`\n✅ STATUS: ${res.statusCode}`);
  console.log(`📋 HEADERS:`, res.headers);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('📦 RESPONSE:', JSON.parse(data));
  });
});

req.on('error', (error) => {
  console.error('❌ ERROR:', error.message);
});

console.log('📤 Sending seller signup request...');
req.write(postData);
req.end();
