import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { BaseController } from './base.controller';
import { prisma } from '../lib/prisma';

export class UserController extends BaseController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name, role } = req.body;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return this.sendError(res, 'User already exists', 400);
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role
        }
      });

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      this.sendSuccess(res, { user, token }, 'User registered successfully');
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return this.sendError(res, 'Invalid credentials', 401);
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return this.sendError(res, 'Invalid credentials', 401);
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      return this.sendSuccess(res, { user, token }, 'Login successful');
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      console.log("User: ", req.user)
      const userId = req.user?.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isVerified: true,
          createdAt: true
        }
      });

      if (!user) {
        return this.sendError(res, 'User not found', 404);
      }

      return this.sendSuccess(res, user);
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { name, email } = req.body;

      const user = await prisma.user.update({
        where: { id: userId },
        data: { name, email },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isVerified: true,
          createdAt: true
        }
      });

      return this.sendSuccess(res, user, 'Profile updated successfully');
    } catch (error) {
      return this.handleError(error, res);
    }
  }
} 