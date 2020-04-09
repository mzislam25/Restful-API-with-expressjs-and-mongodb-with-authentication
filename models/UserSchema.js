const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      message: 'Name is required'
    },
    username: {
      type: String,
      required: true,
      message: 'Username is required'
    },
    password: {
      type: String,
      required: true,
      message: 'Password is required'
    },
    createdAt: String,
    updatedAt: String
 },
 {
   versionKey: false,
   timestamps: true
 });

userSchema.pre('save', async function(next) {
  const pass = await bcrypt.hash(this.password, 10);
  this.password = pass;
  next();
});

userSchema.methods.isValidPassword = async function(password){
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

const UserModel = mongoose.model('User', userSchema );

module.exports = UserModel;