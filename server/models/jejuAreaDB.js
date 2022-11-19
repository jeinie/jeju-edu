const Sequelize = require("sequelize");

module.exports = class jejuAreaDB extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        areaName: {
          type: Sequelize.STRING(1200),
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "jejuAreaDB",
        tableName: "jejuareadb",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
