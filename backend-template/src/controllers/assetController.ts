import { Response } from 'express';
import prisma from '../config/database.js';
import { asyncHandler, AppError } from '../middlewares/errorHandler.js';
import { AuthRequest } from '../middlewares/auth.js';

// === GENERAL ASSETS ===
export const getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { category } = req.query;
  
  const assets = await prisma.generalAsset.findMany({
    where: category ? { assetCategory: category as string } : undefined,
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: assets });
});

export const getById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const asset = await prisma.generalAsset.findUnique({
    where: { id: req.params.id },
    include: { maintenances: true },
  });
  if (!asset) throw new AppError('Asset not found', 404);
  res.json({ success: true, data: asset });
});

export const create = asyncHandler(async (req: AuthRequest, res: Response) => {
  const asset = await prisma.generalAsset.create({ data: req.body });
  res.status(201).json({ success: true, data: asset });
});

export const update = asyncHandler(async (req: AuthRequest, res: Response) => {
  const asset = await prisma.generalAsset.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ success: true, data: asset });
});

export const remove = asyncHandler(async (req: AuthRequest, res: Response) => {
  await prisma.generalAsset.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Asset deleted' });
});

// === MAINTENANCE SCHEDULE ===
export const getMaintenances = asyncHandler(async (req: AuthRequest, res: Response) => {
  const maintenances = await prisma.assetMaintenance.findMany({
    include: { asset: true },
    orderBy: { nextMaintenanceDate: 'asc' },
  });
  res.json({ success: true, data: maintenances });
});

export const createMaintenance = asyncHandler(async (req: AuthRequest, res: Response) => {
  const maintenance = await prisma.assetMaintenance.create({ data: req.body });
  res.status(201).json({ success: true, data: maintenance });
});
