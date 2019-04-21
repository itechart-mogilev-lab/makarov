const httpStatus = require("http-status");
const userService = require("./account.service");
const Role = require("../../enums/roles.enum");
const { mailConfirmationUser } = require("../../config/nodemailer");

module.exports.signin = (req, res, next) => {
  userService
    .authenticate(req.body)
    .then(user => {
      user
        ? res.json(user)
        : res
            .status(httpStatus.UNAUTHORIZED)
            .json({ message: "Username or password is incorrect" });
    })
    .catch(err => next(err));
};

module.exports.checkToken = (req, res, next) => {
  userService
    .getCurrent(req.user)
    .then(user => res.status(httpStatus.OK).json(user))
    .catch(err => next(err));
};

module.exports.signout = (req, res, next) => {
  userService.logout(req.body).then(() => {
    res.status(httpStatus.OK).json("Ok");
  });
};

module.exports.registerUser = (req, res, next) => {
  userService
    .register(req.body, Role.User)
    .then(({ email, verifyToken }) => {
      return mailConfirmationUser(email, verifyToken);
    })
    .then(() => {
      res.status(httpStatus.CREATED).json("Created");
    })
    .catch(err => next(err));
};

module.exports.registerAdmin = (req, res, next) => {
  userService
    .register(req.body, Role.Admin)
    .then(() => {
      res.status(httpStatus.CREATED).json("Created");
    })
    .catch(err => next(err));
};

module.exports.checkProfile = (req, res, next) => {
  userService
    .checkUser(req.params.id)
    .then(user => res.status(httpStatus.OK).json(user))
    .catch(err => next(err));
};

module.exports.editProfile = (req, res, next) => {
  userService
    .editUser(req.user.id, req.body)
    .then(() => {
      res.status(httpStatus.OK).json(`Profile ${req.user.id} edited`);
    })
    .catch(err => next(err));
};

module.exports.editPassword = (req, res, next) => {
  userService
    .editPassword(req.user.id, req.body)
    .then(res.status(httpStatus.OK).json(req.user.id))
    .catch(err => next(err));
};

module.exports.ban = (req, res, next) => {
  userService
    .banUser(req.params.id, req.body)
    .then(() => {
      res.status(httpStatus.OK).json(`User banned`);
    })
    .catch(err => next(err));
};

module.exports.unban = (req, res, next) => {
  userService
    .unbanUser(req.params.id)
    .then(() => {
      res.status(httpStatus.OK).json(`User unbanned`);
    })
    .catch(err => next(err));
};

module.exports.verifyUser = (req, res, next) => {
  userService
    .verify(req.params.id)
    .then(() => {
      res.status(httpStatus.OK).json(`User verified`);
    })
    .catch(err => next(err));
};

module.exports.authSocialNetwork = (req, res, next) => {
  userService
    .authSocialNetwork(req.user)
    .then(data => res.status(httpStatus.OK).json(data))
    .catch(err => next(err));
};

module.exports.getUsers = (req, res, next) => {
  
  userService
    .getUsers(req.query)
    .then(users => res.status(httpStatus.OK).json(users))
    .catch(err => next(err));
};
