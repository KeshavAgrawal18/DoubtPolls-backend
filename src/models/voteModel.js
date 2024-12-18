import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/conection.js";

class Vote extends Model {}

Vote.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    pollId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    choice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Vote",
    tableName: "votes",
    timestamps: true,
  }
);

export default Vote;
