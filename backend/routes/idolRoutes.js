import express from "express"
import { checkIdExists } from "../../middlewares/checkId.js";
import * as IdolController from "../controllers/idolController.js";
import Idol from "../models/Idol.js";

const router = express.Router();

router.get('/', IdolController.getAllIdols);
router.get('/:id', IdolController.getIdolById);
router.post('/',checkIdExists(Idol), IdolController.createIdol);
router.put('/:id', IdolController.updateIdol);
router.delete('/:id', IdolController.deleteIdolById);

export default router;