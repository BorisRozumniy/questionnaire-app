import { Router } from "express";
import { create, read, update, remove } from "../controllers/questionnaire";
const router = Router();

router.post("/questionnaire/", create);
router.get("/questionnaire/", read);
router.patch("/questionnaire/:id", update);
router.delete("/questionnaire/:id", remove);

export default router;
