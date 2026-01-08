import { Router } from 'express';
import * as insuranceController from '../controllers/insuranceController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

// Providers
router.get('/providers', authenticate, insuranceController.getProviders);
router.post('/providers', authenticate, insuranceController.createProvider);
router.put('/providers/:id', authenticate, insuranceController.updateProvider);

// Policies
router.get('/policies', authenticate, insuranceController.getPolicies);
router.post('/policies', authenticate, insuranceController.createPolicy);
router.put('/policies/:id', authenticate, insuranceController.updatePolicy);

// Claims
router.get('/claims', authenticate, insuranceController.getClaims);
router.post('/claims', authenticate, insuranceController.createClaim);
router.put('/claims/:id', authenticate, insuranceController.updateClaim);

export default router;
