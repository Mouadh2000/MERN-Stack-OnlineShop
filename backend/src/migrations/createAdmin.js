const connectDB = require('../config/config');
const Admin = require('../models/admin'); 

connectDB().then(() => {
    createAdmin(); 
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); 
});

const createAdmin = async () => {
    try {
        const newAdmin = new Admin({
            username: 'mouadh',
            last_name: 'msaadi',
            first_name: 'mouadh',
            email: 'mouadh@test.com',
            password: 'Password123!',
            is_staff: true,
            is_admin: true,
            is_active: true, 
            last_login: new Date(), 
            date_joined: new Date(),
        });

        await newAdmin.save();
        console.log('Admin user created successfully');
        process.exit(0); 
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1); 
    }
};
