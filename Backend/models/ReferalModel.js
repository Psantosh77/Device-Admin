import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const referralSetting = db.define(
  "referral_settings",
  {
    level: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.NUMBER,
    },
  },
  
);

(async () => {
  await db.sync();
})();

export default referralSetting;