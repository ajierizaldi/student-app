'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student.init({
    nim: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.VARCHAR
    },
    address: {
      type: DataTypes.STRING
    },
    class: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'student',
    tableName: 'students',
    timestamps: true
  });
  return student;
};