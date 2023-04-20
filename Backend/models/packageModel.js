import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const packageModel = db.define(
  "package_setting",
    {
        title: {
          type: DataTypes.STRING,
        },
        price: {
          type: DataTypes.INTEGER,
        },
        mpp:{
            type: DataTypes.INTEGER,
        },
        description:{
            type: DataTypes.STRING,
        },
        status: {
          type: DataTypes.ENUM("enable", "disable"),
          defaultValue: "enable",
        },
      },
);

(async () => {
  await db.sync();
})();

export default packageModel;