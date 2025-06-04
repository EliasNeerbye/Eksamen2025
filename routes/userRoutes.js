const router = require("express").Router();

const createUser = require("../controllers/users/createUser");
const getUser = require("../controllers/users/getUser");

router.post("/", createUser);
router.get("/:username", getUser);

module.exports = router;
