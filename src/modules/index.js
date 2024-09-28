const express = require("express");
const dnsRoutes = require("./dns/dns.routes");

const router = express.Router();

const setupRoutes = () => {
  router.use('/v1', dnsRoutes);
  return router;
}

module.exports = {
  setupRoutes,
};
