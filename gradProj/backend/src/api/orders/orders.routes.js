const router = require("express").Router();
const permit = require("../../middleware/permission");
const controller = require(`./orders.controller`);

const Role = require("../../enums/roles.enum");


router.get("/", permit([Role.User, Role.Company, Role.Admin]), controller.orders);

router.post('/createOrder', controller.createOrder);

router.put('/setStatusCanceled', permit([Role.User, Role.Company]), controller.setStatusCanceled);
router.put('/setStatusAccepted', permit(Role.Company), controller.setStatusAccepted);
router.put('/setStatusDone', permit(Role.User), controller.setStatusDone);

router.get('/orderHistory', permit([Role.User, Role.Executor]), controller.orderHistory);


module.exports = router;
