import { Router } from 'express';
import * as vehicleController from '../controllers/vehicleController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

// Vehicles
router.get('/', authenticate, vehicleController.getAll);
router.get('/:id', authenticate, vehicleController.getById);
router.post('/', authenticate, vehicleController.create);
router.put('/:id', authenticate, vehicleController.update);
router.delete('/:id', authenticate, vehicleController.remove);

// Contracts
router.get('/contracts/all', authenticate, vehicleController.getContracts);
router.post('/contracts', authenticate, vehicleController.createContract);

// Services
router.get('/services/all', authenticate, vehicleController.getServices);
router.post('/services', authenticate, vehicleController.createService);

// Tax & KIR
router.get('/tax-kir/all', authenticate, vehicleController.getTaxKirs);
router.post('/tax-kir', authenticate, vehicleController.createTaxKir);

// Mutations
router.get('/mutations/all', authenticate, vehicleController.getMutations);
router.post('/mutations', authenticate, vehicleController.createMutation);

export default router;
