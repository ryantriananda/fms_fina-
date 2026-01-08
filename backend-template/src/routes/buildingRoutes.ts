import { Router } from 'express';
import * as buildingController from '../controllers/buildingController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

// Buildings
router.get('/', authenticate, buildingController.getAll);
router.get('/:id', authenticate, buildingController.getById);
router.post('/', authenticate, buildingController.create);
router.put('/:id', authenticate, buildingController.update);
router.delete('/:id', authenticate, buildingController.remove);

// Utilities
router.get('/utilities/all', authenticate, buildingController.getUtilities);
router.post('/utilities', authenticate, buildingController.createUtility);

// Maintenance
router.get('/maintenance/all', authenticate, buildingController.getMaintenances);
router.post('/maintenance', authenticate, buildingController.createMaintenance);

// Reminders
router.get('/reminders/all', authenticate, buildingController.getReminders);
router.post('/reminders', authenticate, buildingController.createReminder);

export default router;
