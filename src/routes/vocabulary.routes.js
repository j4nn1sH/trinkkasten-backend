import express from 'express';

import vocabularyControllers from '../controllers/vocabulary.controllers';

const router = express.Router();

router.get('', vocabularyControllers.getAll);
router.get('/languages', vocabularyControllers.getLanguages);
router.get('/languages/:language', vocabularyControllers.getByLanguage);
router.get('/:id', vocabularyControllers.getOne);
router.put('/:id', vocabularyControllers.update);
router.post('', vocabularyControllers.createNewVocabulary);

module.exports = router;