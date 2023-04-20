import Users from "../models/UserModel.js";
import Admins from "../models/AdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Op } from "sequelize";

// const { Op } = require("sequelize");

export const getUsers = async (req, res) => {
  console.log("Search ", req.params.search);

  const url = req.url;
  const query = req.query;

  console.log(url); // Output: '/search?q=apple&category=fruits'
  console.log(query.serach); // Output: 'apple'

  try {
    if (query?.serach?.length > 0) {
      const users = await Admins.findAll({
        where: {
          role: req.params.role,
          name: {
            [Op.like]: query.serach,
          },
        },
      });
      res.json(users);
    } else {
      const users = await Admins.findAll({
        where: {
          role: req.params.role,
        },
      });
      res.json(users);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "sever error" });
  }
};

export const getAllUsers = async (req, res) => {
  // Except admin
  try {
    const users = await Admins.findAll({
      where: {
        role: {
          [Op.ne]: "admin",
        },
      },
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "sever error" });
  }
};

export const getAllUsersAndAdmin = async (req, res) => {
  try {
    const users = await Admins.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "sever error" });
  }
};

export const findUsers = async (req, res) => {
  try {
    const users = await Admins.findAll({
      where: {
        perent_id: req.params.id,
      },
    });
    console.log(users);
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "sever error" });
  }
};

export const getAllRetailers = async (req, res) => {
  try {
    const users = await Admins.findAll({
      where: {
        role: "retailer",
      },
    });
    console.log(users);
    res
      .status(200)
      .send({ status: true, message: "sucessfully send", data: users });
  } catch (error) {
    res.status(401).send({ message: error });
  }
};

export const getTotalCount = async (req, res) => {
  try {
    const users = await Admins.count({
      where: {
        perent_id: req.params.id,
      },
    });
    console.log(users);
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "sever error" });
  }
};

export const getTotalCountByRole = async (req, res) => {
  try {
    const users = await Admins.count({
      where: {
        role: "cnf",
      },
    });
    const master_distributer = await Admins.count({
      where: {
        role: "master_distributer",
      },
    });
    const distributer = await Admins.count({
      where: {
        role: "distributer",
      },
    });
    const retailer = await Admins.count({
      where: {
        role: "retailer",
      },
    });

    return res.json({
      cnf: users,
      master_distributer: master_distributer,
      distributer: distributer,
      retailer: retailer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "sever error" });
  }
};

export const getuserid = async (req, res) => {
  try {
    const users = await Admins.findAll({
      where: {
        id: req.params.id,
      },
    });
    console.log(users);
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "sever error" });
  }
};

export const Create = async (req, res) => {
  const {
    name,
    email,
    role,
    password,
    mobile,
    business_name,
    address,
    country,
    state,
    city,
    perent_id,
  } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    if (
      name === "" ||
      email === "" ||
      role === "" ||
      password === "" ||
      mobile === "" ||
      business_name === "" ||
      address === "" ||
      country === "" ||
      state === "" ||
      city === ""
    ) {
      return res.status(403).send({
        status: false,
        msg: `All feilds is required `,
      });
    }

    const users = await Admins.findOne({
      where: {
        email: email,
      },
    });

    if (users) {
      return res.status(400).send({
        status: false,
        msg: `User with email ${email} already register `,
      });
    }
    await Admins.create({
      name: name,
      email: email,
      role: role,
      mobile: mobile,
      business_name: business_name,
      address: address,
      state: state,
      country: country,
      city: city,
      perent_id: perent_id,
      password: hashPassword,
    });

    return res
      .status(200)
      .send({ status: true, msg: "User Created Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const updateAdmin = async (req, res) => {
  const {
    id,
    name,
    email,
    role,
    password,
    mobile,
    business_name,
    address,
    country,
    state,
    city,
    perent_id,
  } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await Admins.update(
      {
        name: name,
        email: email,
        role: role,
        mobile: mobile,
        business_name: business_name,
        address: address,
        state: state,
        country: country,
        city: city,
        perent_id: perent_id,
        password: hashPassword,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res
      .status(200)
      .send({ status: true, msg: "User updated Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Admins.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;

    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Admins.update(
      { token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    res.json({ refreshToken });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: error });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Admins.findAll({
    where: {
      token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Admins.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

export const updateStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    const users = await Admins.findAll({
      where: {
        id: id,
      },
    });
    if (!users) {
      return res.status(402).send({ msg: "User Not found" });
    }

    const updateStatus = await Admins.update(
      {
        status: status,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.send(updateStatus);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "sever error" });
  }
};
