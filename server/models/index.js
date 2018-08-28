const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    set: toLower,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['User', 'Admin'],
    required: true,
    default: 'User',
  }
});

function toLower(v) {
  return v.toLowerCase();
}

UserSchema.pre('save', function (next) {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);

  next();
});

module.exports = mongoose.model('User', UserSchema);