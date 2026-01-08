import { Router } from 'express';
import * as consumableController from '../controllers/consumableController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

// Master Items (ATK/ARK)
router.get('/master', authenticate, consumableController.getMasterItems);
router.post('/master', authenticate, consumableController.createMasterItem);
router.put('/master/:id', authenticate, consumableController.updateMasterItem);
router.delete('/master/:id', authenticate, consumableController.deleteMasterItem);

// ATK Requests
router.get('/atk/requests', authenticate, consumableController.getAtkRequests);
router.post('/atk/requests', authenticate, consumableController.createAtkRequest);
router.put('/atk/requests/:id/status', authenticate, consumableController.updateAtkStatus);

// ARK Requests
router.get('/ark/requests', authenticate, consumableController.getArkRequests);
router.post('/ark/requests', authenticate, consumableController.createArkRequest);
router.put('/ark/requests/:id/status', authenticate, consumableController.updateArkStatus);

// Stock Opname
router.get('/stock-opname', authenticate, consumableController.getStockOpnames);
router.post('/stock-opname', authenticate, consumableController.createStockOpname);
router.put('/stock-opname/:id/approve', authenticate, consumableController.approveStockOpname);

export default router;
