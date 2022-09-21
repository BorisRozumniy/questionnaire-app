import { Router } from "express";
import { create, read, update, remove } from "../controllers/questions";
const router = Router();

router.post("/questions/", create);
router.get("/questions/", read);
router.patch("/questions/:id", update);
router.delete("/questions/:id", remove);

export default router;
