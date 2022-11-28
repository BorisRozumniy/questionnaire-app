import { Router } from 'express';
import { create, update, remove, getMany } from '../controllers/questions';

const router = Router();

router.post('/questions/', create);
router.get('/questions/:ids', getMany);
router.patch('/questions/:id', update);
router.delete('/questions/:id', remove);

export default router;
