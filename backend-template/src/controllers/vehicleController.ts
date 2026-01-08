import { Response } from 'express';
import prisma from '../config/database.js';
import { asyncHandler, AppError } from '../middlewares/errorHandler.js';
import { AuthRequest } from '../middlewares/auth.js';

// === VEHICLES ===
export const getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
  const vehicles = await prisma.vehicle.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: vehicles });
});

export const getById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: req.params.id },
    include: { contracts: true, services: true, taxKirs: true },
  });
  if (!vehicle) throw new AppError('Vehicle not found', 404);
  res.json({ success: true, data: vehicle });
});

export const create = asyncHandler(async (req: AuthRequest, res: Response) => {
  const vehicle = await prisma.vehicle.create({
    data: { ...req.body, createdById: req.user!.id },
  });
  res.status(201).json({ success: true, data: vehicle });
});

export const update = asyncHandler(async (req: AuthRequest, res: Response) => {
  const vehicle = await prisma.vehicle.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ success: true, data: vehicle });
});

export const remove = asyncHandler(async (req: AuthRequest, res: Response) => {
  await prisma.vehicle.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Vehicle deleted' });
});

// === CONTRACTS ===
export const getContracts = asyncHandler(async (req: AuthRequest, res: Response) => {
  const contracts = await prisma.vehicleContract.findMany({
    include: { vehicle: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: contracts });
});

export const createContract = asyncHandler(async (req: AuthRequest, res: Response) => {
  const contract = await prisma.vehicleContract.create({ data: req.body });
  res.status(201).json({ success: true, data: contract });
});

// === SERVICES ===
export const getServices = asyncHandler(async (req: AuthRequest, res: Response) => {
  const services = await prisma.vehicleService.findMany({
    include: { vehicle: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: services });
});

export const createService = asyncHandler(async (req: AuthRequest, res: Response) => {
  const service = await prisma.vehicleService.create({ data: req.body });
  res.status(201).json({ success: true, data: service });
});

// === TAX & KIR ===
export const getTaxKirs = asyncHandler(async (req: AuthRequest, res: Response) => {
  const taxKirs = await prisma.taxKir.findMany({
    include: { vehicle: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: taxKirs });
});

export const createTaxKir = asyncHandler(async (req: AuthRequest, res: Response) => {
  const taxKir = await prisma.taxKir.create({ data: req.body });
  res.status(201).json({ success: true, data: taxKir });
});

// === MUTATIONS ===
export const getMutations = asyncHandler(async (req: AuthRequest, res: Response) => {
  const mutations = await prisma.mutation.findMany({
    where: { assetType: 'VEHICLE' },
    include: { vehicle: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: mutations });
});

export const createMutation = asyncHandler(async (req: AuthRequest, res: Response) => {
  const mutation = await prisma.mutation.create({
    data: { ...req.body, assetType: 'VEHICLE' },
  });
  res.status(201).json({ success: true, data: mutation });
});
