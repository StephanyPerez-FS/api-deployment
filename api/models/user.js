const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const validateEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    require: "Email address is required",
    validate: [validateEmail, "Email Invalid"],
  },
  password: {
    type: String,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isNew || user.isModified("password")) {
    //run hashing and salting
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        return next(error);
      }
      bcrypt.hash(user.password, salt, null, (error, hash) => {
        if (error) {
          return next(error);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    //skip
    next();
  }
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
      if (error) return reject(error);
      resolve(isMatch);
    });
  });
};

module.exports = mongoose.model("User", userSchema);
