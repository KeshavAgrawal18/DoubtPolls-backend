import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/conection.js";
import Poll from "./pollModel.js";

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
      references: {
        model: "polls", // References the "polls" table
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    optionId: {
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

// Define associations
Vote.belongsTo(Poll, { foreignKey: "pollId", as: "poll" });
Poll.hasMany(Vote, { foreignKey: "pollId", as: "votes" });

export default Vote;
