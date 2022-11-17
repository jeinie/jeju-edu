const Sequelize = require("sequelize");

module.exports = class StudyAttendsStatus extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          type: Sequelize.INTEGER,
<<<<<<< HEAD
=======
          autoIncrement: true,
>>>>>>> back
          primaryKey: true,
        },
        study_no: {
          type: Sequelize.INTEGER,
        },
        id: {
          type: Sequelize.STRING(20),
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "StudyAttendsStatus",
        tableName: "studyattendsstatus",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
