import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { signUp } from '../../controllers/userController.js';
import { validate } from '../../validators/zodValidator.js';
import { userSignUpSchema } from '../../validators/userSchema.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'Get all the user data'
  });
});

router.post('/signup', validate(userSignUpSchema), signUp);

export default router;
