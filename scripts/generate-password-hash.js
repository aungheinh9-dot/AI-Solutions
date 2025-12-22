/**
 * Script to generate bcrypt hash for admin password
 * Usage: node scripts/generate-password-hash.js <password>
 */

const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function generateHash(password) {
    if (!password) {
        console.error('Error: Password is required');
        console.log('Usage: node scripts/generate-password-hash.js <password>');
        process.exit(1);
    }
    
    bcrypt.hash(password, 10)
        .then(hash => {
            console.log('\n✅ Password hash generated successfully!\n');
            console.log('Add this to your .env file:');
            console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
            rl.close();
        })
        .catch(err => {
            console.error('Error generating hash:', err);
            rl.close();
            process.exit(1);
        });
}

// Get password from command line argument or prompt
const password = process.argv[2];

if (password) {
    generateHash(password);
} else {
    rl.question('Enter admin password to hash: ', (password) => {
        generateHash(password);
    });
}

