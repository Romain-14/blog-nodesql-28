import {Router} from "express";
import { home, story, addStory, editStoryView, editStory} from "../controller/admin/index.js";

const router = Router();

// http://localhost:9000/admin
router.get("/", home); // http://localhost:9000/admin/

router.get("/story", story); // http://localhost:9000/admin/story
router.post("/story/add", addStory);
router.get("/story/edit/:id", editStoryView);
router.post("/story/edit/:id", editStory);



export default router; 