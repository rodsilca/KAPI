import express from "express"
import { getAllGroups, getGroup } from "../controllers/groupController.js";

const router = express.Router();

router.route('/').get(getAllGroups);
router.route('/:id').get(getGroup);

export default router;