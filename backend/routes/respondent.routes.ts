import { Router } from "express";
import { create, read, saveAnswer, remove } from "../controllers/respondent";
const router = Router();

router.post("/respondents/", create);
router.get("/respondents/", read);
router.patch("/respondents/:id", saveAnswer);
router.delete("/respondents/:id", remove);

export default router;
