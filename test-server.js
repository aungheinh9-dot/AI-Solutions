/**
 * Simple test script to verify server is running
 * Run: node test-server.js
 */

const http = require('http');

const testUrl = 'http://localhost:3000/admin/api/verify';

console.log('Testing server connection...');
console.log('URL:', testUrl);
console.log('');

const req = http.get(testUrl, (res) => {
    console.log('✅ Server is running!');
    console.log('Status Code:', res.statusCode);
    console.log('Content-Type:', res.headers['content-type']);
    console.log('');
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('Response:', data);
        try {
            const json = JSON.parse(data);
            console.log('✅ Valid JSON response');
            console.log(JSON.stringify(json, null, 2));
        } catch (e) {
            console.log('❌ Invalid JSON response');
            console.log('Raw response:', data);
        }
    });
});

req.on('error', (error) => {
    console.log('❌ Server is NOT running!');
    console.log('Error:', error.message);
    console.log('');
    console.log('Please start the server first:');
    console.log('  npm start');
    console.log('  or');
    console.log('  node server.js');
});

req.setTimeout(5000, () => {
    console.log('❌ Request timeout - Server might not be running');
    req.destroy();
});

