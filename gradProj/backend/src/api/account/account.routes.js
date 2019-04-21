const router = require("express").Router();
const httpStatus = require("http-status");
const controller = require(`./account.controller`);
const permit = require("../../middleware/permission");
const passport = require("passport");
const { authenticateGoogle } = require('../../config/passport');

const mongoOp = require("../../models/user.model");

const Role = require("../../enums/roles.enum");

router.post("/signin", controller.signin);
router.post("/signout", permit(), controller.signout);
router.get("/checkToken", permit([Role.User, Role.Admin, Role.Company]), controller.checkToken);
router.post("/register", controller.registerUser);
router.post("/register/admin", permit(Role.Admin), controller.registerUser);

router.put("/edit", permit([Role.User, Role.Admin]), controller.editProfile);
router.put("/editPassword", permit([Role.User, Role.Admin]), controller.editPassword);

router.put("/ban/:id", permit(Role.Admin), controller.ban);
router.put("/unban/:id", permit(Role.Admin), controller.unban);

router.get("/verify/:id", controller.verifyUser);

router.post("/google", authenticateGoogle(), controller.authSocialNetwork);

router.get('/', permit(Role.Admin), controller.getUsers);

module.exports = router;
