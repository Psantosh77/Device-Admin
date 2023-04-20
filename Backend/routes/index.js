import express from "express";
import {
  getUsers,
  Create,
  Login,
  Logout,
  findUsers,
  updateAdmin,
  getuserid,
  getTotalCount,
  getAllUsers,
  getAllRetailers,
  updateStatus,
  getTotalCountByRole,
  getAllUsersAndAdmin,
} from "../controllers/Users.js";
import verifyToken from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import "./googleAuth.js";
import passport from "passport";
import {
  transaction,
  used_keysLicence,
  TransactionHistory,
} from "../controllers/transaction.js";

const router = express.Router();

router.get("/users/:role", getUsers);
router.get("/users/parent/:id", findUsers);
router.get("/users/id/:id", getuserid);

router.get("/getTotalCount/:id", getTotalCount);
router.get("/getTotalCountByRole", getTotalCountByRole);
router.post("/updateStatus", updateStatus);

router.get("/users/getall/details", getAllUsers);

router.get("/users/getall/details/andadmin", getAllUsersAndAdmin);

//Licence
router.post("/transaction", transaction);
router.post("/used-key", used_keysLicence);
router.post("/transaction-history", TransactionHistory);

router.get("/allRetailers", getAllRetailers);

router.post("/users", Create);
router.put("/users", updateAdmin);
router.post("/login", Login);
router.get("/token", refreshToken);
router.get("/logout", Logout);
router.get(
  "/google/auth",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// router.get("/google/callback", passport.authenticate("google"), (req, res) => {
//   res.cookie("refreshToken", req.user.token, {
//     httpOnly: false,
//     maxAge: 24 * 60 * 60 * 1000,
//   });
//   res.redirect("http://localhost:3000/free");
// });

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: "https://device-admin.netlify.app/#/login",
		failureRedirect: "/login/failed",
	})
);

export default router;
