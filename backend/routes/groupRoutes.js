import express from "express"
import * as GroupController from "../controllers/groupController.js";
import { checkIdExists } from "../../middlewares/checkId.js";
import Group from "../models/Group.js";

const router = express.Router();

router.get('/', GroupController.getAllGroups);
router.get('/:id', GroupController.getGroupById);
router.post('/',checkIdExists(Group), GroupController.createGroup);
router.put('/:id', GroupController.updateGroup);
router.delete('/:id', GroupController.deleteGroupById);

export default router;