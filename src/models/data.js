const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        event: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        startTime: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        endTime: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "data", // 모델 이름을 설정, 노드 프로젝트에서 사용
        tableName: "data",
        paranoid: false,
        charset: "utf8", //한글을 입력하기 위한 설정
        collate: "utf8_general_ci", //한글을 입력하기 위한 설정
      }
    );
  }
  static associate(db) {}
};
