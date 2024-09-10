const bcrypt = require('bcryptjs');

const plainPassword = 'Password123!';
const hashedPassword = '$2a$13$rCdpjl1dnv.mhGU62308JOSss8sZ1qC4Sd5ZO9oIu3E4XykKllKqG'; // Example hash

bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
    if (err) {
        console.error('Error comparing passwords:', err);
        return;
    }
    console.log('Passwords match:', isMatch); // Should print true if they match
});
