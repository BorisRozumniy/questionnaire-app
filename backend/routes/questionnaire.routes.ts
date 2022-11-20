import { Router } from "express";
import { create, read, readOne, checkLength, update, remove } from "../controllers/questionnaire";
const router = Router();

router.post("/questionnaires/", create);
router.get("/questionnaires/", read);
router.get("/questionnaires/length/", checkLength);
router.get("/questionnaire/:id", readOne);
router.patch("/questionnaires/:id", update);
router.delete("/questionnaires/:id", remove);

export default router;
