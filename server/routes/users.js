import express from 'express';
import { signup, signin, getUsers } from '../controllers/users.js';
const router = express.Router();

router.get('/', getUsers);
router.post('/signup', signup);
router.post('/signin', signin);

export default router;
