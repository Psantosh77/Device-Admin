import express from "express";
import { getBanner, postBanner } from "../controllers/banner.js";


import verifyToken from "../middleware/VerifyToken.js";

const router = express.Router();

router.post('/banner',  postBanner);
router.get('/banner', getBanner);
 
export default router;