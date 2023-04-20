import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const state = db.define(
  "states",
  {
    name: {
      type: DataTypes.STRING,
    },    
   country_id: {
    type: DataTypes.INTEGER,
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

export default state;