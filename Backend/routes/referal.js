import express from "express";
import { updatereferal } from "../controllers/referal.js";
import { getReferral } from "../controllers/referal.js";
import verifyToken from "../middleware/VerifyToken.js";

const router = express.Router();

router.post('/referral',  updatereferal);
router.get('/referral', getReferral);
 
export default router;