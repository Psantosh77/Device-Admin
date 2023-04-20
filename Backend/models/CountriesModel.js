import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const country = db.define(
  "countries",
  {
    name: {
      type: DataTypes.STRING,
    },    
    iso3: {
      type: DataTypes.STRING,
    },    
    iso2: {
      type: DataTypes.STRING,
    },
    phonecode: {
      type: DataTypes.STRING,
    },
    capital: {
      type: DataTypes.STRING,
    },
    currency: {
      type: DataTypes.STRING,
    },
    emoji: {
      type: DataTypes.STRING,
    },
    emojiU: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
    timestamps:false
  }
);

(async () => {
  await db.sync();
})();

export default country;