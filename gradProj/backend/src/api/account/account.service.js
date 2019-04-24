const jwt = require("jsonwebtoken");
const config = require("../../config/environment");
const User = require("../../models/user.model");
const randomstring = require("randomstring");
const {
  mailBanNotification,
  mailUnbanNotification
} = require("../../config/nodemailer");

async function authenticate({ email, password }) {
  try {
    const user = await User.findOne({ email })
      .select("+password")
      .exec();
    if (user === null) throw "User not found";

    let success = await user.comparePassword(password);
    if (success === false) throw "";

    if (user.isBanned) throw `Account banned, reason: ${user.banReason}`;
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

async function register(
  { firstname, lastname, username, password, email, phone, location },
  role
) {
  const verifyToken = randomstring.generate();
  const user = new User({
    firstname,
    lastname,
    username,
    password,
    location,
    email,
    phone,
    verifyToken,
    role
  });

  return user.save().catch(err => {
    throw new Error(err);
  });
}

async function getUsers({
  page = 1,
  perPage = 10,
  location,
  username,
  email,
  phone
}) {
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    select: "username email location phone isBanned banReason"
  };

  let query = {};

  if (username) query.username = { $regex: username };
  if (email) query.email = { $regex: email };
  if (phone) query.phone = { $regex: phone };
  if (location) query.location = { $regex: location };

  const users = await User.paginate(query, options);

  return users;
}

async function checkUser(userID) {
  return await User.findById(userID).exec();
}

async function editUser(userID, updatedInfo) {
  if (!userID) throw new Error("Unauthorized");
  console.log(updatedInfo);
  if (
    !updatedInfo.username |
    !updatedInfo.email |
    !updatedInfo.phone |
    !updatedInfo.location
  ) {
    throw new Error("Please, check the data");
  }

  return await User.findByIdAndUpdate(userID, {
    username: updatedInfo.username,
    email: updatedInfo.email,
    phone: updatedInfo.phone,
    location: updatedInfo.location
  });
}

async function editPassword(userId, data) {
  const user = await User.findById(userId)
    .select("+password")
    .exec();
  if (user === null) throw new Error("User not found");

  let success = await user.comparePassword(data.oldPassword);
  if (success === false) throw "The password is incorrect";

  user.password = data.newPassword;
  return await new Promise((resolve, reject) => {
    user.save(err => {
      if (err) reject(err);

      resolve();
    });
  });
}

async function banUser(userID, updatedInfo) {
  return await User.findByIdAndUpdate(
    userID,
    {
      $set: { isBanned: true, banReason: `${updatedInfo.banReason}` }
    },
    (err, user) => {
      if (err) throw new Error(err);
      mailBanNotification(user.email, user.username, updatedInfo.banReason);
    }
  );
}

async function unbanUser(userID) {
  return await User.findByIdAndUpdate(
    userID,
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

async function verify(verifyToken) {
  const user = await User.findOneAndUpdate(
    { verifyToken: verifyToken },
    { $set: { confirmed: true }, $unset: { verifyToken: { $exist: true } } }
  );
  if (!user) throw "User not found";
}

async function authSocialNetwork(user) {
  console.log(user);
  if (user.isBlocked)
    throw new Error(`The user is blocked, reason: ${user.blockReason}`);
  const data = user.toObject();
  const token = jwt.sign({ id: data._id, role: data.role }, config.jwt.secret, {
    expiresIn: config.jwt.expiration
  });

  return {
    user,
    token
  };
}

async function checkToken({ id, role }) {
  if (role === Role.Admin) {
    const user = await Admin.findById(id);
    return user;
  }
  if (role === Role.User) {
    const user = await User.findById(id);
    return user;
  }
  if (role === Role.Executor) {
    const user = await Executor.findById(id);
    return user;
  }

  throw new Error("Unauthorized");
}

module.exports = {
  authenticate,
  checkToken,
  logout,
  getUsers,
  register,
  checkUser,
  editUser,
  banUser,
  unbanUser,
  verify,
  authSocialNetwork,
  editPassword
};
