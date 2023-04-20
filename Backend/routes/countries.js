import express from "express";
import { City, Countries, State } from "../controllers/countries.js";


import verifyToken from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/countries', Countries);
router.get('/state/:country_id', State);
router.get('/city/:state_id',City);
 
export default router;