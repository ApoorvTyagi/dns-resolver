// Function to create a basic DNS query message for an 'A' record
const buildDNSQuery = (domain) => {
  // 16 bit
  const queryID = Buffer.from([0x00, 0x01]); // Id; default set to 1; represented by the two-byte array
  const flags = Buffer.from([0x01, 0x00]); // Standard query; 0x01 in the first byte means recursion desired. 0x00 in the second byte indicates no other options are set.
  const questionCount = Buffer.from([0x00, 0x01]); // 1 question
  const answerCount = Buffer.from([0x00, 0x00]); // 0 answers
  const authorityCount = Buffer.from([0x00, 0x00]); // 0 authority records
  const additionalCount = Buffer.from([0x00, 0x00]); // 0 additional records
  const queryType = Buffer.from([0x00, 0x01]); // A record
  const queryClass = Buffer.from([0x00, 0x01]); // IN class (Internet)
  
  const domainParts = domain.split(".");
  let question = Buffer.concat(domainParts.map(part => {
    const length = Buffer.from([part.length]);
    const label = Buffer.from(part);
    return Buffer.concat([length, label]);
  }));

  question = Buffer.concat([question, Buffer.from([0x00])]); // add a 0 byte to the end

  const query = Buffer.concat([queryID, flags, questionCount, answerCount, authorityCount, additionalCount, question, queryType, queryClass]);
  return query;
}

const parseDNSResponse = (response) => {
  return `${response[response.length - 4]}.${response[response.length - 3]}.${response[response.length - 2]}.${response[response.length - 1]}`;  
}

module.exports = {
  buildDNSQuery,
  parseDNSResponse,
};
