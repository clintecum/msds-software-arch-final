const manager = require("htpasswd-mgr").default;
const uuid = require("uuid");
const path = require('node:path')
const database = require("./database");
console.log(path.join(__dirname, "../appdata/.htpasswd"))
const htpasswd = manager(path.join(__dirname, "../appdata/.htpasswd"));

const createUser = async (username, password) => {
  const user = { id: uuid.v4(), username, password };
//   htpasswd.addUser(user.username, user.password, {
//     algorithm: "bcrypt",
//     export: true,
//   });
  const collection = database.getCollection("users");
  database.addToCollection(collection, user);
};

module.exports = {
  createUser,
};
