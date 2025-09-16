import express from "express"
import {getAllIdols, getIdolById} from "../controllers/idolController.js";
import * as IdolController from "../controllers/idolController.js";

const router = express.Router();

router.get('/', IdolController.getAllIdols);
router.get('/:id', IdolController.getIdolById);
router.post('/', IdolController.createIdol);
router.put('/:id', IdolController.updateIdol);
router.delete('/:id', IdolController.deleteIdolById);

export default router;