import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import { config } from '../config/env.js';
import { asyncHandler, AppError } from '../middlewares/errorHandler.js';
import { AuthRequest } from '../middlewares/auth.js';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name, role, department, phone } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError('Email already registered', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: role || 'Staff',
      department,
      phone,
    },
    select: { id: true, email: true, name: true, role: true },
  });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );

  res.status(201).json({ success: true, data: { user, token } });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );

  res.json({
    success: true,
    data: {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    },
  });
});

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: { id: true, email: true, name: true, role: true, department: true, phone: true, avatar: true },
  });

  res.json({ success: true, data: user });
});

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name, phone, avatar } = req.body;

  const user = await prisma.user.update({
    where: { id: req.user!.id },
    data: { name, phone, avatar },
    select: { id: true, email: true, name: true, role: true, phone: true, avatar: true },
  });

  res.json({ success: true, data: user });
});
