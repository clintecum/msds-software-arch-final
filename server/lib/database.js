const loki = require("lokijs");
const path = require('node:path');

const DATABASE_FILE = path.join(__dirname, "../database.json");

let DATABASE = null;

const addToCollection = (collection, data) => {
  if (!collection) {
    return;
  }
  const document = typeof data == "string" ? JSON.parse(data) : data;
  collection.insert(document);
};

const initialize = () => {
  DATABASE = new loki(DATABASE_FILE, {
    autoload: true,
    autosave: true,
    autosaveInterval: 1000
  });
};

const getCollection = (name) => {
  return (
    DATABASE.getCollection(name) ||
    DATABASE.addCollection(name, { autoupdate: true })
  );
};

module.exports = {
  addToCollection,
  getCollection,
  initialize,
};
