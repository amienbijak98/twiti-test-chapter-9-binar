'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Twits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Twits.init({
    user_id: DataTypes.INTEGER,
    twit_content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Twits',
  });
  return Twits;
};