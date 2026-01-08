import { Response } from 'express';
import prisma from '../config/database.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import { AuthRequest } from '../middlewares/auth.js';

// === MASTER POD ===
export const getMasterPods = asyncHandler(async (req: AuthRequest, res: Response) => {
  const pods = await prisma.masterPod.findMany({
    include: { tenants: true },
    orderBy: { nomorKamar: 'asc' },
  });
  res.json({ success: true, data: pods });
});

export const createMasterPod = asyncHandler(async (req: AuthRequest, res: Response) => {
  const pod = await prisma.masterPod.create({ data: req.body });
  res.status(201).json({ success: true, data: pod });
});

export const updateMasterPod = asyncHandler(async (req: AuthRequest, res: Response) => {
  const pod = await prisma.masterPod.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ success: true, data: pod });
});

// === TENANT POD ===
export const getTenantPods = asyncHandler(async (req: AuthRequest, res: Response) => {
  const tenants = await prisma.tenantPod.findMany({
    include: { pod: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: tenants });
});

export const createTenantPod = asyncHandler(async (req: AuthRequest, res: Response) => {
  const tenant = await prisma.tenantPod.create({ data: req.body });
  res.status(201).json({ success: true, data: tenant });
});

// === POD REQUESTS ===
export const getPodRequests = asyncHandler(async (req: AuthRequest, res: Response) => {
  const requests = await prisma.podRequest.findMany({
    include: { 
      requester: { select: { id: true, name: true, role: true } },
      pod: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: requests });
});

export const createPodRequest = asyncHandler(async (req: AuthRequest, res: Response) => {
  const request = await prisma.podRequest.create({
    data: { ...req.body, requesterId: req.user!.id },
  });
  res.status(201).json({ success: true, data: request });
});

export const updatePodRequestStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status } = req.body;
  const request = await prisma.podRequest.update({
    where: { id: req.params.id },
    data: { status },
  });
  res.json({ success: true, data: request });
});

// === LOCKERS ===
export const getLockers = asyncHandler(async (req: AuthRequest, res: Response) => {
  const lockers = await prisma.locker.findMany({
    orderBy: { lockerNumber: 'asc' },
  });
  res.json({ success: true, data: lockers });
});

export const createLocker = asyncHandler(async (req: AuthRequest, res: Response) => {
  const locker = await prisma.locker.create({ data: req.body });
  res.status(201).json({ success: true, data: locker });
});

export const updateLocker = asyncHandler(async (req: AuthRequest, res: Response) => {
  const locker = await prisma.locker.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ success: true, data: locker });
});

// === LOCKER REQUESTS ===
export const getLockerRequests = asyncHandler(async (req: AuthRequest, res: Response) => {
  const requests = await prisma.lockerRequest.findMany({
    include: { 
      requester: { select: { id: true, name: true, role: true } },
      locker: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: requests });
});

export const createLockerRequest = asyncHandler(async (req: AuthRequest, res: Response) => {
  const request = await prisma.lockerRequest.create({
    data: { ...req.body, requesterId: req.user!.id },
  });
  res.status(201).json({ success: true, data: request });
});

export const updateLockerRequestStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status } = req.body;
  const request = await prisma.lockerRequest.update({
    where: { id: req.params.id },
    data: { status },
  });
  res.json({ success: true, data: request });
});
