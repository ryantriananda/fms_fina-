import { Router } from 'express';
import * as facilityController from '../controllers/facilityController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

// Master Pod
router.get('/pods', authenticate, facilityController.getMasterPods);
router.post('/pods', authenticate, facilityController.createMasterPod);
router.put('/pods/:id', authenticate, facilityController.updateMasterPod);

// Tenant Pod
router.get('/tenants', authenticate, facilityController.getTenantPods);
router.post('/tenants', authenticate, facilityController.createTenantPod);

// Pod Requests
router.get('/pod-requests', authenticate, facilityController.getPodRequests);
router.post('/pod-requests', authenticate, facilityController.createPodRequest);
router.put('/pod-requests/:id/status', authenticate, facilityController.updatePodRequestStatus);

// Lockers
router.get('/lockers', authenticate, facilityController.getLockers);
router.post('/lockers', authenticate, facilityController.createLocker);
router.put('/lockers/:id', authenticate, facilityController.updateLocker);

// Locker Requests
router.get('/locker-requests', authenticate, facilityController.getLockerRequests);
router.post('/locker-requests', authenticate, facilityController.createLockerRequest);
router.put('/locker-requests/:id/status', authenticate, facilityController.updateLockerRequestStatus);

export default router;
