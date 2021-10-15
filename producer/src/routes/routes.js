import { Router } from "express";
import updateInfoController from "../controllers/updateInfocontroller";
import checkAuthandUser from "../middlewares/checkAuthandUser";
import requestValidator from "../middlewares/validate";

let router = Router();

router.post('/update-cust-reward-info', requestValidator, checkAuthandUser, updateInfoController.updateInfotoQueue);

export default router;