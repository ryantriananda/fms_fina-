import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/authRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import buildingRoutes from './routes/buildingRoutes.js';
import assetRoutes from './routes/assetRoutes.js';
import facilityRoutes from './routes/facilityRoutes.js';
import consumableRoutes from './routes/consumableRoutes.js';
import insuranceRoutes from './routes/insuranceRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Import middleware
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/buildings', buildingRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/facility', facilityRoutes);
app.use('/api/consumables', consumableRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/health`);
});

export default app;
