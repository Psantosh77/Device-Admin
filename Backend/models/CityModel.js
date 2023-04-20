import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const cities = db.define(
  "cities",
  {
    name: {
      type: DataTypes.STRING,
    },    
   state_id: {
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

export default cities;