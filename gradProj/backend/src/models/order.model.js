const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const validateRecurrence = function(recurrence) {
  if ((recurrence < 0) | (recurrence > 7)) return false;
  return true;
};

const validateRegularity = function(regularity) {
  if ((regularity < 0) | (regularity > 3)) return false;
  return true;
};

const schema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    executor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    location: { type: String, required: true },///////////////////
    adress: { type: String, required: true },
    isReccurent: {
      type: Number,
      default: 0,
      required: true,
      validate: [validateRecurrence, "must be between 0 and 7"]
    },
    regularity: {
      type: Number,
      required: true,
      default: 0,
      validate: [validateRegularity, "must be between 0 and 3"]
    },
    status: { type: String, required: true, lowercase: true },
    email: {
      type: String,
      required: true
    },
    description: { type: String },
    type: { type: String, required: true },
    smallRooms: { type: Number },
    bigRooms: { type: Number },
    bathRooms: { type: Number },
    squareMeters: { type: Number },
    service: {
      furniture: { type: Boolean },
      pool: { type: Boolean },
      carpet: { type: Boolean }
    },
    smallCarpets: { type: Number },
    bigCarpet: { type: Number },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    expectedTime: { type: Date, required: true },
    cleaningDays: [],
    companyName: { type: String, required: true },
    price: {
      type: Number,
      required: true
    },
    time: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

schema.plugin(mongoosePaginate);
//module.exports = Orders = mongoose.model("Orders", schema);

schema.post("save", function(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("User already exist"));
  } else {
    next(error);
  }
});

schema.set("toObject", {
  transform: function(doc, ret) {
    delete ret.__v;
  }
});

module.exports = mongoose.model("Order", schema);
