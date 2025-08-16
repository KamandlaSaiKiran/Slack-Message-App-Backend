import express from 'express';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { validate } from '../../validators/zodValidator.js';
import { createWorkspaceController } from '../../controllers/workspaceController.js';
import { createWorkspaceSchema } from '../../validators/workspaceSchema.js';
const router = express.Router();

router.post(
  '/',
  isAuthenticated,
  validate(createWorkspaceSchema),
  createWorkspaceController
);

export default router;
