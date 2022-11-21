const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
const Study = require("./study");
const StudyAttendsStatus = require("./studyAttendsStatus");
const JejuAreaDB = require("./jejuAreaDB");
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
db.StudyAttendsStatus = StudyAttendsStatus;
db.jejuAreaDB = JejuAreaDB;

User.init(sequelize);
Study.init(sequelize);
StudyAttendsStatus.init(sequelize);
JejuAreaDB.init(sequelize);

User.associate(db);
Study.associate(db);
StudyAttendsStatus.associate(db);
JejuAreaDB.associate(db);

module.exports = db;
