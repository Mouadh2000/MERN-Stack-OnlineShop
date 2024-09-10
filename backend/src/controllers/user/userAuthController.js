const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const EmailService = require('../../services/emailService');

class UserAuthController {
  constructor() {
    this.secretKey = process.env.JWT_SECRET;
    this.refreshSecretKey = process.env.JWT_REFRESH_SECRET;
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
  }

  async signup(req, res) {
    const { firstName, lastName, phoneNumber, email, password, gender } = req.body;
    try {
      const errors = {};
      if (!firstName) errors.firstName = 'First name is required';
      if (!lastName) errors.lastName = 'Last name is required';
      if (!phoneNumber) errors.phoneNumber = 'Phone number is required';
      if (!email) errors.email = 'Email is required';
      if (!password) errors.password = 'Password is required';
      if (!gender) errors.gender = 'Gender is required';

      if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      const newUser = new User({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        gender,
        verificationToken: jwt.sign({ email }, this.secretKey, { expiresIn: '1h' }) // Generate token for email verification
      });

      await newUser.save();

      // Send verification email
      await EmailService.sendVerificationEmail(newUser, newUser.verificationToken);

      res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      if (!user.isVerified) {
        return res.status(401).json({ message: 'Email not verified' });
      }
      if (user.disabled) {
        return res.status(401).json({ message: 'Your account is disabled' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const accessToken = jwt.sign(
        { id: user._id, firstName: user.firstName, lastName: user.lastName },
        this.secretKey,
        { expiresIn: '1h' }
      );

      const refreshToken = jwt.sign(
        { id: user._id, firstName: user.firstName, lastName: user.lastName },
        this.refreshSecretKey,
        { expiresIn: '7d' }
      );

      res.json({
        access_token: accessToken,
        refresh_token: refreshToken
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async refreshToken(req, res) {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    try {
      const decoded = jwt.verify(refresh_token, this.refreshSecretKey);

      const accessToken = jwt.sign(
        { id: decoded.id, firstName: decoded.firstName, lastName: decoded.lastName },
        this.secretKey,
        { expiresIn: '1h' }
      );

      const newRefreshToken = jwt.sign(
        { id: decoded.id, firstName: decoded.firstName, lastName: decoded.lastName },
        this.refreshSecretKey,
        { expiresIn: '7d' }
      );

      res.json({
        access_token: accessToken,
        refresh_token: newRefreshToken
      });
    } catch (error) {
      res.status(403).json({ message: 'Invalid refresh token' });
    }
  }

  async getUserDetails(req, res) {
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(req.user);
  }

  async verifyEmail(req, res) {
    const { token } = req.query;
  
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
  
    try {
      const decoded = jwt.verify(token, this.secretKey);
  
      const user = await User.findOne({ email: decoded.email });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid token or user not found' });
      }
  
      if (user.isVerified) {
        return res.status(400).json({ message: 'Email already verified' });
      }
  
      user.isVerified = true;
      user.verificationToken = null;
      await user.save();
  
      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error('Error verifying email:', error);
      res.status(400).json({ message: 'Invalid or expired token' });
    }
  }
  
}

module.exports = new UserAuthController();
