import express from "express";
import addPWs from "../Controllers/addPW.mjs";
import updatePWs from "../Controllers/updatePWs.mjs";
import viewPWs from "../Controllers/viewPWs.mjs";

const router = express.Router();

router.use(addPWs);
router.use(updatePWs);
router.use(viewPWs);

export default router;
