import { Router } from 'express';
import * as assetController from '../controllers/assetController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

// General Assets
router.get('/', authenticate, assetController.getAll);
router.get('/:id', authenticate, assetController.getById);
router.post('/', authenticate, assetController.create);
router.put('/:id', authenticate, assetController.update);
router.delete('/:id', authenticate, assetController.remove);

// Maintenance Schedule
router.get('/maintenance/all', authenticate, assetController.getMaintenances);
router.post('/maintenance', authenticate, assetController.createMaintenance);

export default router;
