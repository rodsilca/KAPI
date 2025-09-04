import express from "express"
import {getAllArtist, getArtist} from "../controllers/artistController.js";

const router = express.Router();

router.route('/').get(getAllArtist);
router.route('/:id').get(getArtist);

export default router;