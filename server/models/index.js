const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
const Study = require("./study");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Study = Study;

User.init(sequelize);
Study.init(sequelize);

User.associate(db);
Study.associate(db);

module.exports = db;
