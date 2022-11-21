const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.STRING(20),
          primaryKey: true,
        },
        password: {
          type: Sequelize.STRING(200),
        },
        name: {
          type: Sequelize.STRING(20),
        },
        good_cnt: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        bad_cnt: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};