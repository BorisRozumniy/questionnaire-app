import { Router } from 'express';
import { read } from '../controllers/result';

const router = Router();

router.get('/result/', read);

export default router;
