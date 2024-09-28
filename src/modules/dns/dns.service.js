require('dotenv').config();
const dgram = require("dgram");
const { buildDNSQuery, parseDNSResponse } = require("./dns.util");

const ROOT_DNS_SERVER = process.env.ROOT_DNS_SERVER
const DNS_PORT = process.env.DNS_PORT || 53;

async function customDNSQuery(domain) {
  const socket = dgram.createSocket("udp4");
  const message = buildDNSQuery(domain);

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("DNS query timed out"));
      socket.close();
    }, 5_000);  // 5 seconds timeout

    socket.send(message, DNS_PORT, ROOT_DNS_SERVER, (err) => {
      if (err) {
        console.log('Error while sending message', err);
        clearTimeout(timeout);
        reject(err);
      }
      console.log('Message sent');
    });

    socket.on("message", (response) => {
      clearTimeout(timeout);
      console.log("Received response:", response);
      resolve(parseDNSResponse(response));
      socket.close();
    });

    socket.on('error', (err) => {
      console.log('Error while receiving message', err);
      clearTimeout(timeout);
      reject(err);
      socket.close();
    });
  });
}

module.exports = {
  customDNSQuery,
};
