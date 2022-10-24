const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide an email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minlength: 6
    }

})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  };
  
  module.exports = mongoose.model('User', UserSchema);