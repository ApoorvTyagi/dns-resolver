const { customDNSQuery } = require("./dns.service");

const getDNS = async (req, _res, next) => {
  const { domain } = req.query;
  console.log('domain to query', domain);
  const ip = await customDNSQuery(domain);
  next({ ip });
}

module.exports = {
  getDNS,
};

