const jwt = require("jsonwebtoken");
const config = require("../../config/environment");
const Company = require("../../models/company.model");
const Review = require("../../models/review.model");
const randomstring = require("randomstring");
const {
  mailBanNotification,
  mailUnbanNotification
} = require("../../config/nodemailer");

async function authenticate({ email, password }) {
  try {
    const user = await Company.findOne({ email })
      .select("+password")
      .exec();
    if (user === null) throw "Company not found";
    let success = await user.comparePassword(password);
    if (success === false) throw "";

    if (user.isBanned) throw `Account banned, reason: ${user.block}`;
    if (!user.confirmed) throw "Please confirm ur email!";

    const data = user.toObject();

    const token = jwt.sign(
      { id: data._id, role: data.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiration }
    );

    const { password: userPassword, ...userWithoutPassword } = data;

    return {
      ...userWithoutPassword,
      token
    };
  } catch (err) {
    throw new Error(err);
  }
}

async function logout({ token }) {
  return true;
}

async function register(values, role) {
  const verifyToken = randomstring.generate();
  const {
    username,
    password,
    email,
    phone,
    companyName,
    description,
    location,
    workingDays,
    standartSmallRoom,
    standartBigRoom,
    standartBathRoom,
    generalBathRoom,
    generalBigRoom,
    generalSmallRoom,
    afterRepairBathRoom,
    afterRepairBigRoom,
    afterRepairSmallRoom,
    smallCarpet,
    bigCarpet,
    office,
    furniture,
    industrial,
    pool
  } = values;

  const workingDaysObj = {
    0: workingDays.indexOf(0) !== -1 ? true : false,
    1: workingDays.indexOf(1) !== -1 ? true : false,
    2: workingDays.indexOf(2) !== -1 ? true : false,
    3: workingDays.indexOf(3) !== -1 ? true : false,
    4: workingDays.indexOf(4) !== -1 ? true : false,
    5: workingDays.indexOf(5) !== -1 ? true : false,
    6: workingDays.indexOf(6) !== -1 ? true : false
  };

  const user = new Company({
    username,
    password,
    companyName,
    description,
    location,
    workingDays: workingDaysObj,
    typesOfCleaning: {
      standart: {
        isAvailable: Boolean(
          standartSmallRoom && standartBigRoom && standartBathRoom
        ),
        averagePrice:
          (parseInt(standartBathRoom) +
            parseInt(standartBigRoom) +
            parseInt(standartSmallRoom)) /
          3,
        standartBathRoom,
        standartBigRoom,
        standartSmallRoom
      },
      general: {
        isAvailable: Boolean(
          generalSmallRoom && generalBigRoom && generalBathRoom
        ),
        averagePrice:
          (parseInt(generalBathRoom) +
            parseInt(generalBigRoom) +
            parseInt(generalSmallRoom)) /
          3,
        generalBathRoom,
        generalBigRoom,
        generalSmallRoom
      },
      afterRepair: {
        isAvailable: Boolean(
          afterRepairSmallRoom && afterRepairBigRoom && afterRepairBathRoom
        ),
        averagePrice:
          (parseInt(afterRepairBathRoom) +
            parseInt(afterRepairBigRoom) +
            parseInt(afterRepairSmallRoom)) /
          3,
        afterRepairBathRoom,
        afterRepairBigRoom,
        afterRepairSmallRoom
      },
      carpet: {
        isAvailable: Boolean(smallCarpet && bigCarpet),
        averagePrice: (parseInt(smallCarpet) + parseInt(bigCarpet)) / 2,
        bigCarpet,
        smallCarpet
      },
      office,
      furniture,
      industrial,
      pool
    },
    email,
    verifyToken,
    phone,
    role
  });
  return user.save().catch(err => {
    throw new Error(err);
  });
}

async function checkCompany(userID) {
  return await Company.findById(userID);
}

async function editCompany(userID, updatedInfo) {
  if (!userID) throw new Error("Unauthorized");

  if (
    !updatedInfo.username |
    !updatedInfo.email |
    !updatedInfo.phone |
    !updatedInfo.location |
    !updatedInfo.companyName |
    !updatedInfo.description
  ) {
    throw new Error("Wrong data");
  }

  return await Company.findByIdAndUpdate(userID, {
    username: updatedInfo.username,
    email: updatedInfo.email,
    phone: updatedInfo.phone,
    location: updatedInfo.location,
    companyName: updatedInfo.companyName,
    description: updatedInfo.description
  });
}

async function editTypesOfCleaning(userID, values) {
  const {
    standartSmallRoom,
    standartBigRoom,
    standartBathRoom,
    generalBathRoom,
    generalBigRoom,
    generalSmallRoom,
    afterRepairBathRoom,
    afterRepairBigRoom,
    afterRepairSmallRoom,
    smallCarpet,
    bigCarpet,
    office,
    furniture,
    industrial,
    pool
  } = values;

  const typesOfCleaning = {
    standart: {
      isAvailable: Boolean(
        standartSmallRoom && standartBigRoom && standartBathRoom
      ),
      averagePrice:
        (parseInt(standartBathRoom) +
          parseInt(standartBigRoom) +
          parseInt(standartSmallRoom)) /
        3,
      standartBathRoom,
      standartBigRoom,
      standartSmallRoom
    },
    general: {
      isAvailable: Boolean(
        generalSmallRoom && generalBigRoom && generalBathRoom
      ),
      averagePrice:
        (parseInt(generalBathRoom) +
          parseInt(generalBigRoom) +
          parseInt(generalSmallRoom)) /
        3,
      generalBathRoom,
      generalBigRoom,
      generalSmallRoom
    },
    afterRepair: {
      isAvailable: Boolean(
        afterRepairSmallRoom && afterRepairBigRoom && afterRepairBathRoom
      ),
      averagePrice:
        (parseInt(afterRepairBathRoom) +
          parseInt(afterRepairBigRoom) +
          parseInt(afterRepairSmallRoom)) /
        3,
      afterRepairBathRoom,
      afterRepairBigRoom,
      afterRepairSmallRoom
    },
    carpet: {
      isAvailable: Boolean(smallCarpet && bigCarpet),
      averagePrice: (parseInt(smallCarpet) + parseInt(bigCarpet)) / 2,
      bigCarpet,
      smallCarpet
    },
    office,
    furniture,
    industrial,
    pool
  };

  await Company.findByIdAndUpdate(userID, { typesOfCleaning });
  return typesOfCleaning;
}

async function editPassword(userId, data) {
  const user = await Company.findById(userId)
    .select("+password")
    .exec();
  if (user === null) throw new Error("The user is not found");

  let success = await user.comparePassword(data.oldPassword);
  if (success === false) throw new Error("The password is incorrect");

  user.password = data.newPassword;
  return new Promise((resolve, reject) => {
    user.save(err => {
      if (err) reject(err);
      resolve();
    });
  });
}

async function banComp(compID, updatedInfo) {
  return await Company.findByIdAndUpdate(
    compID,
    {
      $set: { isBanned: true, banReason: `${updatedInfo.banReason}` }
    },
    (err, user) => {
      if (err) throw new Error(err);
      mailBanNotification(user.email, user.username, updatedInfo.banReason);
    }
  );
}

async function unbanComp(compID) {
  return await Company.findByIdAndUpdate(
    compID,
    {
      $set: { isBanned: false },
      $unset: { banReason: { $exist: true } }
    },
    (err, user) => {
      if (err) throw new Error(err);
      mailUnbanNotification(user.email, user.username);
    }
  );
}

async function rateCompany(userId, data, companyId) {
  const existReview = await Review.findOne({
    customer: userId,
    executor: companyId
  });
  const company = await Company.findById(companyId);

  if (!company) throw new Error("Company is not found");

  if (existReview) {
    existReview.rating = data.rating;
    existReview.comment = data.comment;
    await existReview.save();
  } else {
    const review = new Review({
      rating: data.rating,
      comment: data.comment,
      customer: userId,
      executor: companyId
    });
    await review.save();
  }

  const reviews = await Review.find({ executor: companyId });

  const ratingSum = reviews.reduce((sum, review) => {
    return sum + review.rating;
  }, 0);

  const rating = parseFloat(ratingSum / reviews.length).toFixed(2);

  await Company.findByIdAndUpdate(companyId, { $set: { rating } });

  return rating;
}

async function getReviews({ page = 1 }, companyId) {
  const options = {
    page: parseInt(page, 10) || 1,
    limit: 5,
    select: "rating comment customer updated_at",
    sort: "-updated_at"
  };

  if (!companyId) throw new Error("Company is not found");
  let query = { executor: companyId };

  const companies = await Review.paginate(query, options);

  return companies;
}

async function verify(verifyToken) {
  const user = await Company.findOneAndUpdate(
    { verifyToken: verifyToken },
    { $set: { confirmed: true }, $unset: { verifyToken: { $exist: true } } }
  );
  if (!user) throw "User not found";
}

async function getCompanies({
  page = 1,
  perPage = 5,
  workingDays,
  location,
  sortBy,
  name,
  carpet,
  furniture,
  pool,
  type
}) {
  let sort = {};
  if (sortBy === "price" || sortBy === "-price") {
    const typeOfSort = sortBy === "price" ? 1 : -1;
    if (type === "standart")
      sort["typesOfCleaning.standart.averagePrice"] = typeOfSort;
    if (type === "general")
      sort["typesOfCleaning.general.averagePrice"] = typeOfSort;
    if (type === "afterRepair")
      sort["typesOfCleaning.afterRepair.averagePrice"] = typeOfSort;
    if (carpet) sort["typesOfCleaning.carpet.averagePrice"] = typeOfSort;
    if (type === "office") sort["typesOfCleaning.office"] = typeOfSort;
    if (furniture) sort["typesOfCleaning.furniture"] = typeOfSort;
    if (type === "industrial") sort["typesOfCleaning.industrial"] = typeOfSort;
    if (pool) sort["typesOfCleaning.pool"] = typeOfSort;
  }

  if (sortBy === "rating" || sortBy === "-rating") {
    const typeOfSort = sortBy === "rating" ? -1 : 1;
    sort.rating = typeOfSort;
  }

  if (sortBy === "popularity" || sortBy === "-popularity") {
    const typeOfSort = sortBy === "popularity" ? 1 : -1;
    sort.popularity = typeOfSort;
  }

  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    select:
      "companyName isBanned confirmed description popularity workingDays location rating typesOfCleaning",
    sort
  };

  let query = {};

  if (location) query.location = { $regex: location };
  if (name) query.companyName = { $regex: name };
  if (workingDays) {
    workingDaysArray = workingDays.split(",");
    if (workingDaysArray.indexOf("0") !== -1) query["workingDays.0"] = true;
    if (workingDaysArray.indexOf("1") !== -1) query["workingDays.1"] = true;
    if (workingDaysArray.indexOf("2") !== -1) query["workingDays.2"] = true;
    if (workingDaysArray.indexOf("3") !== -1) query["workingDays.3"] = true;
    if (workingDaysArray.indexOf("4") !== -1) query["workingDays.4"] = true;
    if (workingDaysArray.indexOf("5") !== -1) query["workingDays.5"] = true;
    if (workingDaysArray.indexOf("6") !== -1) query["workingDays.6"] = true;
  }
  if (type === "standart") query["typesOfCleaning.standart.isAvailable"] = true;
  if (type === "general") query["typesOfCleaning.general.isAvailable"] = true;
  if (type === "afterRepair")
    query["typesOfCleaning.afterRepair.isAvailable"] = true;
  if (carpet) query["typesOfCleaning.carpet.isAvailable"] = true;
  if (type === "office") query["typesOfCleaning.office"] = { $gte: 1 };
  if (furniture) query["typesOfCleaning.furniture"] = { $gte: 1 };
  if (type === "industrial") query["typesOfCleaning.industrial"] = { $gte: 1 };
  if (pool) query["typesOfCleaning.pool"] = { $gte: 1 };

  query["isBanned"] = false;
  query["confirmed"] = true;

  const companies = await Company.paginate(query, options);
  return companies;
}

module.exports = {
  authenticate,
  logout,
  register,
  checkCompany,
  editCompany,
  editTypesOfCleaning,
  editPassword,
  banComp,
  unbanComp,
  rateCompany,
  getReviews,
  verify,
  getCompanies
};
