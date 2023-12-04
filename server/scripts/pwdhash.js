const bcrypt = require('bcrypt');
const saltRounds = 10;

// Get the plain password from command-line arguments
const plainPassword = process.argv[2];

if (!plainPassword) {
  console.error('Please provide a password as a command-line argument.');
  process.exit(1);
}

const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);

console.log('Hashed Password:', hashedPassword);
