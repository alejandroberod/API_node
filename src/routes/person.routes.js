import Router from 'express';
import { showPerson, showPersonId, createPerson, deletePerson, updatePerson } from '../../src/controllers/PersonController.js';

const router = Router();

router.get('/person', showPerson);
router.get('/person/:id', showPersonId);
router.post('/person', createPerson);
router.put('/person/:id', updatePerson);
router.delete('/person/:id', deletePerson);

export default router;