const httpStatus = require("http-status");
const orderService = require("./orders.service");
const Order = require("../../models/order.model");
const Status = require("../../enums/status.enum");

module.exports.orders = (req, res) => {
  orderService
    .getOrders(req.user, req.query)
    .then(orders => res.status(httpStatus.OK).json(orders))
    .catch(err => next(err));
};

/*module.exports.getById = (req, res) => {
  service.getOrderByID(req.params.id)
  .then(order => res.status(httpStatus.OK).json(order))
  .catch(err => next(err));
};*/

module.exports.createOrder = (req, res, next) => {
  orderService
    .createOrder(req.body)
    .then(() => {
      res.status(httpStatus.CREATED).json("Created");
    })
    .catch(err => next(err));
};

module.exports.setStatusCanceled = (req, res, next) => {
  orderService
    .setStatusCanceled(req.body.orderId)
    .then(() => {
      res.status(httpStatus.OK).json("Order canceled");
    })
    .catch(err => next(err));
};

module.exports.setStatusAccepted = (req, res, next) => {
  orderService
    .setStatusAccepted(req.body.orderId)
    .then(() => {
      res.status(httpStatus.OK).json("Order accepted");
    })
    .catch(err => next(err));
};

module.exports.setStatusDone = (req, res, next) => {
  orderService
    .setStatusDone(req.body.orderId)
    .then(() => {
      res.status(httpStatus.OK).json("Order confirmed");
    })
    .catch(err => next(err));
};

module.exports.orderHistory = (req, res, next) => {
  orderService
    .ordersHistory(req.user)
    .then(orders => {
      res.status(httpStatus.OK).json(orders);
    })
    .catch(err => next(err));
};
