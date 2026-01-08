import { Router } from 'express';
import * as adminController from '../controllers/adminController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = Router();

// Users
router.get('/users', authenticate, adminController.getUsers);
router.post('/users', authenticate, authorize('Admin'), adminController.createUser);
router.put('/users/:id', authenticate, authorize('Admin'), adminController.updateUser);
router.delete('/users/:id', authenticate, authorize('Admin'), adminController.deleteUser);

// Vendors
router.get('/vendors', authenticate, adminController.getVendors);
router.post('/vendors', authenticate, adminController.createVendor);
router.put('/vendors/:id', authenticate, adminController.updateVendor);
router.delete('/vendors/:id', authenticate, adminController.deleteVendor);

// Master Data
router.get('/master-data', authenticate, adminController.getMasterData);
router.post('/master-data', authenticate, adminController.createMasterData);
router.put('/master-data/:id', authenticate, adminController.updateMasterData);
router.delete('/master-data/:id', authenticate, adminController.deleteMasterData);

// Approval Workflow
router.get('/workflows', authenticate, adminController.getWorkflows);
router.post('/workflows', authenticate, adminController.createWorkflow);
router.put('/workflows/:id', authenticate, adminController.updateWorkflow);

// Daily Ops
router.get('/logbook', authenticate, adminController.getLogBooks);
router.post('/logbook', authenticate, adminController.createLogBook);
router.get('/timesheet', authenticate, adminController.getTimesheets);
router.post('/timesheet', authenticate, adminController.createTimesheet);

export default router;
