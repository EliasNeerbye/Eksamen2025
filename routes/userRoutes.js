const ratelimit = require("express-rate-limit");

const router = require("express").Router();

const limiter = ratelimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "For mange forespørsler, vennligst prøv igjen senere.",
        data: null,
    },
});

router.use(limiter);

const createUser = require("../controllers/users/createUser");
const getUser = require("../controllers/users/getUser");

router.post("/", createUser);
router.get("/:username", getUser);

module.exports = router;
