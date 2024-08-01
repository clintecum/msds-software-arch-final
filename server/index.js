// const https = require("node:https");
const http = require("node:http");
// const fs = require("node:fs");
// const path = require("node:path");
const app = require("./app");
const database = require("./lib/database");

const port = process.env.PORT || 3000;

// const key = fs.readFileSync(path.join(__dirname, "certs", "server.key"));
// const cert = fs.readFileSync(path.join(__dirname, "certs", "server.crt"));

// const options = {
//   key: key,
//   cert: cert,
//   passphrase: "yourpassword",
// };

const main = async () => {
  database.initialize();
  //   https.createServer(options, app).listen(port, () => {
  //     console.log(`Server listening on port ${port}`);
  //   });
  http.createServer(app).listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
