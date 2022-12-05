const Sequelize = require("sequelize");
const User = require("./userModel");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = User;
db.sequelize = sequelize;

User.init(sequelize);

User.associate(db);

module.exports = db;
