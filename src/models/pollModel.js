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
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Optional description for the poll
    },
    options: {
      type: DataTypes.JSONB, // JSONB type to store an array of objects
      allowNull: false,
      validate: {
        isArrayOfObjectsWithLabel(value) {
          if (!Array.isArray(value)) {
            throw new Error("Options must be an array of objects.");
          }
          for (const option of value) {
            if (typeof option.label !== "string" || !option.label.trim()) {
              throw new Error(
                "Each option must have a non-empty 'label' of type string."
              );
            }
          }
        },
      },
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
