import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Admins = db.define(
  "admins",
  {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM,
      values: ["cnf", "master_distributer", "distributer", "retailer", "admin"]
    },
    perent_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobile : {
      type: DataTypes.INTEGER,
    },
    business_name: {
      type: DataTypes.STRING
    },
    referral_email: {
      type: DataTypes.STRING
    },
    sponser: {
      type: DataTypes.STRING
    },    
    currency: {
      type: DataTypes.STRING
    },    
    address: {
      type: DataTypes.STRING
    },    
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },    
    country: {
      type: DataTypes.STRING
    },    
       
    pic: {
      type: DataTypes.STRING
    },    
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:"googleusercontent"
    },
    // show_pass: { 
    //   type: DataTypes.STRING
    // },
    available_key: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0
    },
    used_key: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Active", "Inactive"],
      allowNull: true
    },
    qr_code: {
      type: DataTypes.STRING,
      allowNull: true

    },
    aadhar_card:{
      type: DataTypes.STRING,
      allowNull: true
    },
    pan_card:{
      type: DataTypes.STRING,
      allowNull: true
    },
    pin_state:{
      type: DataTypes.ENUM,
      values: ["enabled", "disabled"],
      allowNull: true
    },
    pin_value:{
      type: DataTypes.STRING,
      allowNull: true
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    referral_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    admin_app_version: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at:{
      type: DataTypes.DATE,
      value: new Date()
    },
    updated_at:{
      type: DataTypes.DATE,
      value: new Date()
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

export default Admins;
