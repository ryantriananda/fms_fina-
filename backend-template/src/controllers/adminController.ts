import { Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/database.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import { AuthRequest } from '../middlewares/auth.js';

// === USERS ===
export const getUsers = asyncHandler(async (req: AuthRequest, res: Response) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, department: true, phone: true, status: true, createdAt: true },
    orderBy: { name: 'asc' },
  });
  res.json({ success: true, data: users });
});

export const createUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { password, ...rest } = req.body;
  const hashedPassword = await bcrypt.hash(password || 'password123', 12);
  
  const user = await prisma.user.create({
    data: { ...rest, password: hashedPassword },
    select: { id: true, email: true, name: true, role: true },
  });
  res.status(201).json({ success: true, data: user });
});

export const updateUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { password, ...rest } = req.body;
  const data: any = { ...rest };
  
  if (password) {
    data.password = await bcrypt.hash(password, 12);
  }
  
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data,
    select: { id: true, email: true, name: true, role: true },
  });
  res.json({ success: true, data: user });
});

export const deleteUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  await prisma.user.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'User deleted' });
});

// === VENDORS ===
export const getVendors = asyncHandler(async (req: AuthRequest, res: Response) => {
  const vendors = await prisma.vendor.findMany({ orderBy: { vendorName: 'asc' } });
  res.json({ success: true, data: vendors });
});

export const createVendor = asyncHandler(async (req: AuthRequest, res: Response) => {
  const vendor = await prisma.vendor.create({ data: req.body });
  res.status(201).json({ success: true, data: vendor });
});

export const updateVendor = asyncHandler(async (req: AuthRequest, res: Response) => {
  const vendor = await prisma.vendor.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ success: true, data: vendor });
});

export const deleteVendor = asyncHandler(async (req: AuthRequest, res: Response) => {
  await prisma.vendor.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Vendor deleted' });
});

// === MASTER DATA ===
export const getMasterData = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { category } = req.query;
  
  const data = await prisma.masterData.findMany({
    where: category ? { category: category as string } : undefined,
    orderBy: { name: 'asc' },
  });
  res.json({ success: true, data });
});

export const createMasterData = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await prisma.masterData.create({ data: req.body });
  res.status(201).json({ success: true, data });
});

export const updateMasterData = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await prisma.masterData.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ success: true, data });
});

export const deleteMasterData = asyncHandler(async (req: AuthRequest, res: Response) => {
  await prisma.masterData.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Data deleted' });
});

// === APPROVAL WORKFLOW ===
export const getWorkflows = asyncHandler(async (req: AuthRequest, res: Response) => {
  const workflows = await prisma.approvalWorkflow.findMany({ orderBy: { module: 'asc' } });
  res.json({ success: true, data: workflows });
});

export const createWorkflow = asyncHandler(async (req: AuthRequest, res: Response) => {
  const workflow = await prisma.approvalWorkflow.create({ data: req.body });
  res.status(201).json({ success: true, data: workflow });
});

export const updateWorkflow = asyncHandler(async (req: AuthRequest, res: Response) => {
  const workflow = await prisma.approvalWorkflow.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ success: true, data: workflow });
});

// === LOGBOOK ===
export const getLogBooks = asyncHandler(async (req: AuthRequest, res: Response) => {
  const logs = await prisma.logBook.findMany({
    include: { recordedBy: { select: { id: true, name: true } } },
    orderBy: { tanggalKunjungan: 'desc' },
  });
  res.json({ success: true, data: logs });
});

export const createLogBook = asyncHandler(async (req: AuthRequest, res: Response) => {
  const log = await prisma.logBook.create({
    data: { ...req.body, recordedById: req.user!.id },
  });
  res.status(201).json({ success: true, data: log });
});

// === TIMESHEET ===
export const getTimesheets = asyncHandler(async (req: AuthRequest, res: Response) => {
  const timesheets = await prisma.timesheet.findMany({
    include: { employee: { select: { id: true, name: true, role: true } } },
    orderBy: { date: 'desc' },
  });
  res.json({ success: true, data: timesheets });
});

export const createTimesheet = asyncHandler(async (req: AuthRequest, res: Response) => {
  const timesheet = await prisma.timesheet.create({ data: req.body });
  res.status(201).json({ success: true, data: timesheet });
});
