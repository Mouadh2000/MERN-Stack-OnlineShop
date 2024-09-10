// middleware/AuthenticateUser.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

class AuthenticateUser {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }

    async authenticate(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token required' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, this.secretKey);
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Attach user to request object
            req.user = user;
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            res.status(403).json({ message: 'Invalid or expired token' });
        }
    }
}

module.exports = AuthenticateUser;
