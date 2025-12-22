const express = require('express');
const router = express.Router();
const apiNoteController = require('../../controllers/api/noteController');
const isApiAuth = require('../../middleware/isApiAuth');

router.get('/', isApiAuth, apiNoteController.getNotes);
router.get('/:id', isApiAuth, apiNoteController.getNote);
router.post('/', isApiAuth, apiNoteController.createNote);
router.put('/:id', isApiAuth, apiNoteController.updateNote);
router.delete('/:id', isApiAuth, apiNoteController.deleteNote);

module.exports = router;
