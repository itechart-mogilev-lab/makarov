const nodemailer = require("nodemailer");
const keys = require("../config/keys");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: keys.gmail.gmailUser,
    pass: keys.gmail.gmailPassword
  },
  tls: {
    rejectUnauthorized: false
  }
});

const mailConfirmationUser = (to, verifyToken) => {
  const mailOptions = {
    from: "no-reply@CleaninServices",
    to: `${to}`,
    subject: "Please verify yourself",
    html: `<div style="width: 100%, display: flex, justify-content: center">Hello!
      <br/>
      Thank you for registering
      <br/>
      Click the link below to confirm your email
      <br/>
      <a href="http://localhost:3001/api/account/verify/${verifyToken}">Click me!</a>;</div>`
  };
  transport.sendMail(mailOptions);
};

const mailConfirmationCompany = (to, verifyToken) => {
  const mailOptions = {
    from: "no-reply@CleaningServices",
    to: `${to}`,
    subject: "Please verify yourself",
    html: `<div>Hello!
      <br/>
      Thank you for registering
      <br/>
      Click the link below to confirm your email
      <br/>
      <a href="http://localhost:3001/api/companies/verify/${verifyToken}">Click me!</a>;</div>`
  };
  transport.sendMail(mailOptions);
};

const mailBanNotification = (to, username, reason) => {
  const mailOptions = {
    from: "no-reply@CleaningServices",
    to: `${to}`,
    subject: "Account ban at CleaningServices",
    html: `<div>Accoun <b>${username}</b> have been banned,
    <br/> 
    Reason: ${reason}`
  };

  transport.sendMail(mailOptions);
};

const mailUnbanNotification = (to, username) => {
  const mailOptions = {
    from: "no-reply@CleaningServices", // sender address
    to: `${to}`, // list of receivers
    subject: "You've been unbanned at CleaningServices", // Subject line
    html: `<div>Account <b>${username}</b> - ubanned. 
    <br/>
    Sorry for inconvenience` // plain text body
  };

  transport.sendMail(mailOptions);
};

const mailOrderStatusChanges = (to, orderID, status) => {
  const mailOptions = {
    from: "no-reply@CleaningServices",
    to: `${to}`,
    subject: "Order status changed",
    html: `<div>Order <a href="http://localhost:3001/api/orders/${orderID}">${orderID}</a> status changed to ${status}`
  };

  transport.sendMail(mailOptions);
};

module.exports = {
  mailConfirmationCompany,
  mailConfirmationUser,
  mailBanNotification,
  mailUnbanNotification,
  mailOrderStatusChanges
};
