import { Response } from 'express';
import prisma from '../config/database.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import { AuthRequest } from '../middlewares/auth.js';

// === MASTER ITEMS ===
export const getMasterItems = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { type } = req.query; // ATK or ARK
  
  const items = await prisma.masterItem.findMany({
    where: type ? { type: type as string } : undefined,
    orderBy: { itemName: 'asc' },
  });
  res.json({ success: true, data: items });
});

export const createMasterItem = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await prisma.masterItem.create({ data: req.body });
  res.status(201).json({ success: true, data: item });
});

export const updateMasterItem = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await prisma.masterItem.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ success: true, data: item });
});

export const deleteMasterItem = asyncHandler(async (req: AuthRequest, res: Response) => {
  await prisma.masterItem.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Item deleted' });
});

// === ATK REQUESTS ===
export const getAtkRequests = asyncHandler(async (req: AuthRequest, res: Response) => {
  const requests = await prisma.atkRequest.findMany({
    include: { requester: { select: { id: true, name: true, role: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: requests });
});

export const createAtkRequest = asyncHandler(async (req: AuthRequest, res: Response) => {
  const count = await prisma.atkRequest.count();
  const transactionNumber = `TRX/ATK/${new Date().getFullYear()}/${String(count + 1).padStart(3, '0')}`;
  
  const request = await prisma.atkRequest.create({
    data: { ...req.body, transactionNumber, requesterId: req.user!.id },
  });
  res.status(201).json({ success: true, data: request });
});

export const updateAtkStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status } = req.body;
  const request = await prisma.atkRequest.update({
    where: { id: req.params.id },
    data: { status },
  });
  res.json({ success: true, data: request });
});

// === ARK REQUESTS ===
export const getArkRequests = asyncHandler(async (req: AuthRequest, res: Response) => {
  const requests = await prisma.arkRequest.findMany({
    include: { requester: { select: { id: true, name: true, role: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: requests });
});

export const createArkRequest = asyncHandler(async (req: AuthRequest, res: Response) => {
  const count = await prisma.arkRequest.count();
  const transactionNumber = `TRX/ARK/${new Date().getFullYear()}/${String(count + 1).padStart(3, '0')}`;
  
  const request = await prisma.arkRequest.create({
    data: { ...req.body, transactionNumber, requesterId: req.user!.id },
  });
  res.status(201).json({ success: true, data: request });
});

export const updateArkStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status } = req.body;
  const request = await prisma.arkRequest.update({
    where: { id: req.params.id },
    data: { status },
  });
  res.json({ success: true, data: request });
});

// === STOCK OPNAME ===
export const getStockOpnames = asyncHandler(async (req: AuthRequest, res: Response) => {
  const opnames = await prisma.stockOpname.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: opnames });
});

export const createStockOpname = asyncHandler(async (req: AuthRequest, res: Response) => {
  const count = await prisma.stockOpname.count();
  const opnameId = `SO-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(count + 1).padStart(3, '0')}`;
  
  const diff = req.body.physicalQty - req.body.systemQty;
  const status = diff === 0 ? 'MATCHED' : 'DISCREPANCY';
  
  const opname = await prisma.stockOpname.create({
    data: { ...req.body, opnameId, diff, status },
  });
  res.status(201).json({ success: true, data: opname });
});

export const approveStockOpname = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { statusApproval } = req.body;
  const opname = await prisma.stockOpname.update({
    where: { id: req.params.id },
    data: { statusApproval },
  });
  res.json({ success: true, data: opname });
});
