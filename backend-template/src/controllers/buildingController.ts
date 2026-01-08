import { Response } from 'express';
import prisma from '../config/database.js';
import { asyncHandler, AppError } from '../middlewares/errorHandler.js';
import { AuthRequest } from '../middlewares/auth.js';

// === BUILDINGS ===
export const getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
  const buildings = await prisma.building.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: buildings });
});

export const getById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const building = await prisma.building.findUnique({
    where: { id: req.params.id },
    include: { utilities: true, maintenances: true, reminders: true },
  });
  if (!building) throw new AppError('Building not found', 404);
  res.json({ success: true, data: building });
});

export const create = asyncHandler(async (req: AuthRequest, res: Response) => {
  const building = await prisma.building.create({ data: req.body });
  res.status(201).json({ success: true, data: building });
});

export const update = asyncHandler(async (req: AuthRequest, res: Response) => {
  const building = await prisma.building.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ success: true, data: building });
});

export const remove = asyncHandler(async (req: AuthRequest, res: Response) => {
  await prisma.building.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Building deleted' });
});

// === UTILITIES ===
export const getUtilities = asyncHandler(async (req: AuthRequest, res: Response) => {
  const utilities = await prisma.utility.findMany({
    include: { building: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: utilities });
});

export const createUtility = asyncHandler(async (req: AuthRequest, res: Response) => {
  const utility = await prisma.utility.create({ data: req.body });
  res.status(201).json({ success: true, data: utility });
});

// === MAINTENANCE ===
export const getMaintenances = asyncHandler(async (req: AuthRequest, res: Response) => {
  const maintenances = await prisma.buildingMaintenance.findMany({
    include: { building: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: maintenances });
});

export const createMaintenance = asyncHandler(async (req: AuthRequest, res: Response) => {
  const maintenance = await prisma.buildingMaintenance.create({ data: req.body });
  res.status(201).json({ success: true, data: maintenance });
});

// === REMINDERS ===
export const getReminders = asyncHandler(async (req: AuthRequest, res: Response) => {
  const reminders = await prisma.reminder.findMany({
    include: { building: true },
    orderBy: { expiryDate: 'asc' },
  });
  res.json({ success: true, data: reminders });
});

export const createReminder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const reminder = await prisma.reminder.create({ data: req.body });
  res.status(201).json({ success: true, data: reminder });
});
