import { Router } from "express";
import { create, read, update, remove } from "../controllers/questionnaire";
const router = Router();

router.post("/questionnaires/", create);
router.get("/questionnaires/", read);
router.get("/questionnaires/:id", read);
router.patch("/questionnaires/:id", update);
router.delete("/questionnaires/:id", remove);

export default router;
