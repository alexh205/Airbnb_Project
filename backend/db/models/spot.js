"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId",
        onDelete: "CASCADE",
      });

      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
      });
      Spot.hasMany(models.Image, {
        foreignKey: "imageableId",
        constraints: false,
        scope: { imageableType: "Spot" },
      });
      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
      });
    }
  }
  Spot.init(
    {
      ownerId: { type: DataTypes.INTEGER },
      address: { type: DataTypes.STRING },
      city: { type: DataTypes.STRING },
      state: { type: DataTypes.STRING },
      country: { type: DataTypes.STRING },
      lat: { type: DataTypes.FLOAT },
      lng: { type: DataTypes.FLOAT },
      name: {
        type: DataTypes.STRING,
      },
      description: { type: DataTypes.STRING },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
