import express from 'express';
import {
	getItems,
	getOneItem,
	saveItem,
	editItem,
	deleteItem,
} from '../controllers/items.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getOneItem);
router.post('/', auth, saveItem);
router.patch('/:id', auth, editItem);
router.delete('/:id', auth, deleteItem);

export default router;
