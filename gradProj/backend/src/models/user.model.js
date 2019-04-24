const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoosePaginate = require("mongoose-paginate");

const validateEmail = function(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validatePhoneNumber = function(phoneNumber) {
  const re = /^\+375(29|33|44|25)\d{7}$/;
  return re.test(phoneNumber);
};

const validateUsername = function(username) {
  const re = /^[a-zA-Z][a-zA-Z0-9-_ \.]{4,10}$/;
  return re.test(username);
};

const validatePassword = function(password) {
  const re = /^[a-zA-Z0-9]{8,20}$/;
  return re.test(password);
};

const validateLocation = function(location) {
  const re = /^.{6,26}$/;
  return re.test(location);
};

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [
        validateUsername,
        `Username must be 4-10 characters and can contain only letters, numbers and "-", "_", "." symbols`
      ]
    },
    password: {
      type: String,
      select: false,
      validate: [
        validatePassword,
        `Password must be 8-20 characters and cant contain spaces`
      ]
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, `Please input valid email address`]
    },
    phone: {
      type: String,
      validate: [validatePhoneNumber, `Please enter valid phone number`]
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    verifyToken: {
      type: String,
      default: ""
    },
    isBanned: { type: Boolean, default: false },
    banReason: { type: String },
    role: {
      type: String,
      required: true,
      lowercase: true
    },
    googleID: {
      type: String
    },
    location: {
      type: String,
      validate: [validateLocation, "Please fill a valid adress(City, street)"]
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

schema.plugin(mongoosePaginate);
//export const Users = mongoose.model("Users", schema);

schema.pre("save", function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

schema.pre("update", function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

schema.post("save", function(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("User already exist"));
  } else {
    next(error);
  }
});

schema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, success) => {
      console.log(candidatePassword, this.password);
      if (err) return reject(err);
      return resolve(success);
    });
  });
};

schema.set("toObject", {
  transform: function(doc, ret) {
    delete ret.__v;
  }
});

module.exports = mongoose.model("User", schema);
