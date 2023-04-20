import express from "express";
import { getpackages, packages, updatePackage } from "../controllers/packages.js";

import verifyToken from "../middleware/VerifyToken.js";

const router = express.Router();

router.post('/packages',  packages);
router.get('/packages', getpackages);
router.put('/packages', updatePackage);
 
export default router;