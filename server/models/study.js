const Sequelize = require("sequelize");

module.exports = class Study extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        study_no: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        who_open: {
          type: Sequelize.STRING(20),
        },
        study_name: {
          type: Sequelize.STRING(200),
        },
        study_category: {
          type: Sequelize.STRING(500),
        },
        study_detail: {
          type: Sequelize.STRING(2000),
        },
        members: {
          type: Sequelize.INTEGER,
        },
        min_party: {
          type: Sequelize.INTEGER,
        },
        open_date: {
          type: Sequelize.DATEONLY,
        },
        close_date: {
          type: Sequelize.DATEONLY,
        },
        study_date: {
          type: Sequelize.DATEONLY,
        },
        location: {
          type: Sequelize.STRING(200),
        },
        tmX: {
          type: Sequelize.INTEGER,
        },
        tmY: {
          type: Sequelize.INTEGER,
        },
        deadline: {
          type: Sequelize.DATEONLY,
        },
        status: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Study",
        tableName: "study",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
