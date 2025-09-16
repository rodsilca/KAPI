import express from "express"
import {getAllIdols, getIdolById} from "../controllers/idolController.js";

const router = express.Router();

router.route('/').get(getAllIdols);
router.route('/:id').get(getIdolById);

export default router;