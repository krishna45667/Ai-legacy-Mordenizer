const express = require("express");

const router = express.Router();

const { modernizeCode } = require("../controller/modernizeController");

router.post("/", modernizeCode);

module.exports = router;