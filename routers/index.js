const router = require("express").Router();
const user = require("./user.router");
const content = require("./content");

router.use("/users", user);
router.use("/content", content);

module.exports = router;