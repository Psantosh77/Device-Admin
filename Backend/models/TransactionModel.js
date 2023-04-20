import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const transactions = db.define(
  "transction",
  {
    // name: {
    //   type: DataTypes.STRING,
    // },
    datetime: {
      type: DataTypes.DATE,
      
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    _by: {
      type: DataTypes.TEXT,
    },
    des: {
      type: DataTypes.TEXT,
    },
    key: {
      type: DataTypes.TEXT,
    },
    balance: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["Debit", "Credit"],
    },
    current_bal: {
      type: DataTypes.TEXT,
    },
    mode: {
      type: DataTypes.ENUM,
      values: ["Wallet"],
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

(async () => {
  await db.sync();
})();

export default transactions;
