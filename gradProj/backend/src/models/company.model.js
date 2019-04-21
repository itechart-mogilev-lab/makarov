const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const mongoosePaginate = require("mongoose-paginate");

const validateEmail = function(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validatePhoneNumber = function(phone) {
  const re = /^\+375(29|33|44|25)\d{7}$/;
  return re.test(phone);
};

const validatePassword = function(password) {
  const re = /^[a-zA-Z0-9]{8,20}$/;
  return re.test(password);
};

const validateUsername = function(username) {
  const re = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,9}$/;
  return re.test(username);
};

const validateCompanyName = function(companyName) {
  const re = /^[a-zA-Z][a-zA-Z0-9-_ \.]{3,20}$/;
  return re.test(companyName);
};

const validateLocation = function(location) {
  const re = /^[A-Za-z-]{3,16}$/;
  return re.test(location);
};

const validateDescription = function(description) {
  const re = /^(.){0,80}$/;
  return re.test(description);
};

/*const validateWorkingDays = function(workingDays) {
  if ((workingDays.length < 1) | (workingDays.length > 7)) return false;
  if ((Math.max(...workingDays) > 7) | (Math.max(...workingDays) < 0))
    return false;
  if ((Math.min(...workingDays) > 7) | (Math.min(...workingDays) < 0))
    return false;
  return true;
};*/

const schema = new mongoose.Schema(
  {
    logo: {
      type: String
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [
        validateUsername,
        "The username can contain letters, numbers, -, ., _ and must be between 2 and 9 characters"
      ]
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, `Please input valid email address`]
    },
    companyName: {
      type: String,
      required: true,
      unique: true,
      validate: [
        validateCompanyName,
        "The company name must be between 3 and 20 characters"
      ]
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: [
        validatePassword,
        `Password must be 8-20 characters and cant contain spaces`
      ]
    },
    description: {
      type: String,
      validate: [
        validateDescription,
        "Company description msut contain less then 80 characters"
      ]
    },
    location: {
      type: String,
      required: true,
      validate: [
        validateLocation,
        "The city can contain only letters, -, numbers and must be between 3 and 12 characters"
      ]
    },
    rating: {
      type: Number,
      required: false,
      default: 0
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    popularity: { type: Number, default: 0 },
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
    typesOfCleaning: {
      standart: {
        isAvailable: { type: Boolean, required: true },
        averagePrice: { type: Number, require: true },
        standartBathRoom: { type: Number, required: true },
        standartBigRoom: { type: Number, required: true },
        standartSmallRoom: { type: Number, required: true }
      },
      general: {
        isAvailable: { type: Boolean, required: true },
        averagePrice: { type: Number, require: true },
        generalBathRoom: { type: Number, required: true },
        generalBigRoom: { type: Number, required: true },
        generalSmallRoom: { type: Number, required: true }
      },
      afterRepair: {
        isAvailable: { type: Boolean, required: true },
        averagePrice: { type: Number, require: true },
        afterRepairBathRoom: { type: Number, required: true },
        afterRepairBigRoom: { type: Number, required: true },
        afterRepairSmallRoom: { type: Number, required: true }
      },
      carpet: {
        isAvailable: { type: Boolean, required: true },
        averagePrice: { type: Number, require: true },
        bigCarpet: { type: Number, required: true },
        smallCarpet: { type: Number, required: true }
      },
      office: { type: Number, required: true },
      furniture: { type: Number, required: true },
      industrial: { type: Number, required: true },
      pool: { type: Number, required: true }
    },
    workingDays: {
      0: { type: Boolean, required: true, default: false },
      1: { type: Boolean, required: true, default: false },
      2: { type: Boolean, required: true, default: false },
      3: { type: Boolean, required: true, default: false },
      4: { type: Boolean, required: true, default: false },
      5: { type: Boolean, required: true, default: false },
      6: { type: Boolean, required: true, default: false }
    },
    phone: {
      type: String,
      required: true,
      validate: [validatePhoneNumber, `Please enter valid phone number`]
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

schema.plugin(mongoosePaginate);
//module.exports = Companies = mongoose.model("Company", schema);

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
    next(new Error("Company already exist"));
  } else {
    next(error);
  }
});

schema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, success) => {      
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

module.exports = mongoose.model("Company", schema);
