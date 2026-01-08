import { Response } from 'express';
import prisma from '../config/database.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import { AuthRequest } from '../middlewares/auth.js';

// === PROVIDERS ===
export const getProviders = asyncHandler(async (req: AuthRequest, res: Response) => {
  const providers = await prisma.insuranceProvider.findMany({
    include: { policies: true },
    orderBy: { name: 'asc' },
  });
  res.json({ success: true, data: providers });
});

export const createProvider = asyncHandler(async (req: AuthRequest, res: Response) => {
  const provider = await prisma.insuranceProvider.create({ data: req.body });
  res.status(201).json({ success: true, data: provider });
});

export const updateProvider = asyncHandler(async (req: AuthRequest, res: Response) => {
  const provider = await prisma.insuranceProvider.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ success: true, data: provider });
});

// === POLICIES ===
export const getPolicies = asyncHandler(async (req: AuthRequest, res: Response) => {
  const policies = await prisma.insurancePolicy.findMany({
    include: { provider: true, claims: true },
    orderBy: { endDate: 'asc' },
  });
  res.json({ success: true, data: policies });
});

export const createPolicy = asyncHandler(async (req: AuthRequest, res: Response) => {
  const policy = await prisma.insurancePolicy.create({ data: req.body });
  res.status(201).json({ success: true, data: policy });
});

export const updatePolicy = asyncHandler(async (req: AuthRequest, res: Response) => {
  const policy = await prisma.insurancePolicy.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ success: true, data: policy });
});

// === CLAIMS ===
export const getClaims = asyncHandler(async (req: AuthRequest, res: Response) => {
  const claims = await prisma.insuranceClaim.findMany({
    include: { policy: { include: { provider: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: claims });
});

export const createClaim = asyncHandler(async (req: AuthRequest, res: Response) => {
  const claim = await prisma.insuranceClaim.create({ data: req.body });
  res.status(201).json({ success: true, data: claim });
});

export const updateClaim = asyncHandler(async (req: AuthRequest, res: Response) => {
  const claim = await prisma.insuranceClaim.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ success: true, data: claim });
});
