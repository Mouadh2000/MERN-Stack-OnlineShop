const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(this.password, 13);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Compare the provided password with the stored hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to activate user after email verification
userSchema.methods.activate = function () {
  this.status = 'active';
  this.isVerified = true;
  this.verificationToken = '';
  return this.save();
};

// Method to disable a user
userSchema.methods.disable = function () {
  this.disabled = true;
  return this.save();
};

const User = mongoose.model('User', userSchema);
module.exports = User;
