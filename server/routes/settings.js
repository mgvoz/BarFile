import express from 'express';
import {
	getSettings,
	getOneSetting,
	createSettings,
	editSettings,
	deleteSetting,
} from '../controllers/settings.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSettings);
router.get('/:id', getOneSetting);
router.post('/', auth, createSettings);
router.patch('/:id', auth, editSettings);
router.delete('/:id', auth, deleteSetting);

export default router;
