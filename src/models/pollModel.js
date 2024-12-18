import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/conection.js";

class Poll extends Model {}

Poll.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Optional description for the poll
    },
    options: {
      type: DataTypes.ARRAY(DataTypes.STRING), // PostgreSQL array for storing poll options
      allowNull: false,
    },
    creatorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Poll",
    tableName: "polls",
    timestamps: true,
  }
);

export default Poll;
