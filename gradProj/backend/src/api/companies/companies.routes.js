const router = require("express").Router();
const httpStatus = require("http-status");
const controller = require(`./companies.controller`);
const permit = require("../../middleware/permission");

const Role = require("../../enums/roles.enum");

router.post("/signin", controller.signin);
router.post("/signout", permit(), controller.signout);
router.post("/register", controller.registerCompany);
router.get("/verify/:token", controller.verifyCompany);

router.get('/', controller.get);
router.get("/:id", controller.checkCompProfile);

router.put("/edit", permit(Role.Company), controller.editCompProfile);
router.put("/edit/typesOfCleaning", permit(Role.Company), controller.editTypesOfCleaning);
router.put("/edit/editPassword", permit(Role.Company), controller.editPassword);

router.put("/ban/:id", permit(Role.Admin), controller.ban);
router.put("/unban/:id", permit(Role.Admin), controller.unban);

router.put('/:id/rate', permit([Role.User, Role.Admin]), controller.rate);
router.put('/:id/reviews', controller.getReviews);

module.exports = router;