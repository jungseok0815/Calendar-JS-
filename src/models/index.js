const Sequelize = require("sequelize"); //시퀄라이즈를 사용하기위해
const User = require("./userModel");
const Data = require("./data");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Dat = Data;
db.User = User;
db.sequelize = sequelize;

User.init(sequelize);
Data.init(sequelize);

User.associate(db);
Data.associate(db);
module.exports = db;
