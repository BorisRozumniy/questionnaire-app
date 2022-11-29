import { Router } from 'express';
import { create, read, saveAnswer, remove, readOne, checkRespondentsLength } from '../controllers/respondent';

const router = Router();

router.post('/respondents/', create);
router.get('/respondents/', read);
router.get('/respondent/:id', readOne);
router.get('/respondents/length/', checkRespondentsLength);
router.patch('/respondents/:id', saveAnswer);
router.delete('/respondents/:id', remove);

export default router;
