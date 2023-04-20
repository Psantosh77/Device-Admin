import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const bannerModel = db.define(
  "banner_setting",
  {
    image: {
      type: DataTypes.TEXT("long"),
    },
    position: {
      type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM("pending", "active", "disabled"),
        defaultValue: "pending",
      },
  },
);

(async () => {
  await db.sync();
})();

export default bannerModel;