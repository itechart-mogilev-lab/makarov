const httpStatus = require("http-status");
const CompService = require("./companies.service");
const Role = require("../../enums/roles.enum");
const { mailConfirmationCompany } = require("../../config/nodemailer");

module.exports.signin = (req, res, next) => {
  CompService.authenticate(req.body)
    .then(user => {
      user
        ? res.json(user)
        : res
            .status(httpStatus.UNAUTHORIZED)
            .json({ message: "Username or password is incorrect" });
    })
    .catch(err => next(err));
};

module.exports.signout = (req, res, next) => {
  CompService.logout(req.body).then(() => {
    res.status(httpStatus.OK).json("Ok");
  });
};

module.exports.registerCompany = (req, res, next) => {
  CompService.register(req.body, Role.Company)
    .then(({ email, verifyToken }) => {
      return mailConfirmationCompany(email, verifyToken);
    })
    .then(() => {
      res.status(httpStatus.CREATED).json("Created");
    })
    .catch(err => next(err));
};

module.exports.get = (req, res, next) => {
  CompService.getCompanies(req.query)
    .then(companies => res.status(httpStatus.OK).json(companies))
    .catch(err => {
      res.send(err.message);
    });
};

module.exports.checkCompProfile = (req, res) => {
  CompService.checkCompany(req.params.id)
    .then(user => res.status(httpStatus.OK).json(user))
    .catch(err => next(err));
};

module.exports.editCompProfile = (req, res, next) => {
  CompService.editCompany(req.user.id, req.body)
    .then(user => res.status(httpStatus.OK).json(user))
    .catch(err => next(err));
};

module.exports.editTypesOfCleaning = (req, res, next) => {
  CompService.editTypesOfCleaning(req.user.id, req.body)
    .then(user => res.status(httpStatus.OK).json(user))
    .catch(err => next(err));
};

module.exports.editPassword = (req, res, next) => {
  CompService.editPassword(req.user.id, req.body)
    .then(user => res.status(httpStatus.OK).json(user))
    .catch(err => next(err));
};

module.exports.ban = (req, res, next) => {
  CompService.banComp(req.params.id, req.body)
    .then(() => {
      res.status(httpStatus.OK).json(`Company banned`);
    })
    .catch(err => next(err));
};

module.exports.unban = (req, res, next) => {
  CompService.unbanComp(req.params.id)
    .then(() => {
      res.status(httpStatus.OK).json(`Company unbanned`);
    })
    .catch(err => next(err));
};

module.exports.rate = (req, res, next) => {
  CompService.rateCompany(req.user.id, req.body, req.params.id)
    .then(rating => {
      res.status(httpStatus.OK).json(rating);
    })
    .catch(err => next(err));
};

module.exports.getReviews = (req, res, next) => {
  CompService.getReviews(req.body, req.params.id)
    .then(reviews => {
      res.status(httpStatus.OK).json(reviews);
    })
    .catch(err => next(err));
};

module.exports.verifyCompany = (req, res, next) => {
  CompService.verify(req.params.token)
    .then(() => {
      res.status(httpStatus.OK).json(`Company verified`);
    })
    .catch(err => next(err));
};
