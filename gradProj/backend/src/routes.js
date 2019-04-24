const router = require("express").Router();
const { version } = require("../package.json");

router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "API",
    data: {
      version: `${version}`
    }
  });
});

//auth+reviews
router.use("/account", require("./api/account").router);
router.use("/orders", require("./api/orders").router);
router.use("/companies", require("./api/companies").router);

module.exports = router;
