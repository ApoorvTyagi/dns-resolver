const express = require("express");
const { getDNS } = require("./dns.controller");

const router = express.Router();

router.get("/dns", getDNS);

module.exports = router;
