import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

export class InventoryController extends BaseController {
  async createItem(req: Request, res: Response) {
    try {
      const { name, sku, categoryId, price, quantity, reorderLevel, description, imageUrl } = req.body;

      const item = await prisma.inventoryItem.create({
        data: {
          name,
          sku,
          price,
          quantity,
          reorderLevel,
          description,
          imageUrl,
          category: {
            connect: {id: categoryId}
          }
        },
        include: {
          category: true
        }
      });

      return this.sendSuccess(res, item, 'Inventory item created successfully');
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async getItems(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, search, category } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const where: Prisma.InventoryItemWhereInput = {
        isArchived: false,
        ...(search && {
          OR: [
            { name: { contains: search as string, mode: Prisma.QueryMode.insensitive } },
            { sku: { contains: search as string, mode: Prisma.QueryMode.insensitive } }
          ]
        }),
        ...(category && { category: { name: { contains: category as string, mode: Prisma.QueryMode.insensitive } } })
      };

      const [items, total] = await Promise.all([
        prisma.inventoryItem.findMany({
          where,
          include: {
            category: true
          },
          skip,
          take: Number(limit),
          orderBy: { createdAt: 'desc' }
        }),
        prisma.inventoryItem.count({ where })
      ]);

      return this.sendSuccess(res, {
        items,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / Number(limit))
        }
      });
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async getItem(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const item = await prisma.inventoryItem.findUnique({
        where: { id },
        include: {
          category: true,
          transactions: {
            take: 10,
            orderBy: { createdAt: 'desc' }
          }
        }
      });

      if (!item) {
        return this.sendError(res, 'Item not found', 404);
      }

      return this.sendSuccess(res, item);
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async updateItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, sku, categoryId, price, reorderLevel, description, imageUrl } = req.body;

      const item = await prisma.inventoryItem.update({
        where: { id },
        data: {
          name,
          sku,
          categoryId,
          price,
          reorderLevel,
          description,
          imageUrl
        },
        include: {
          category: true
        }
      });

      return this.sendSuccess(res, item, 'Item updated successfully');
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async deleteItem(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.inventoryItem.update({
        where: { id },
        data: { isArchived: true }
      });

      return this.sendSuccess(res, null, 'Item deleted successfully');
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async adjustStock(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { quantity, type, notes } = req.body;
      const userId = (req as any).user.userId;

      const item = await prisma.inventoryItem.findUnique({
        where: { id }
      });

      if (!item) {
        return this.sendError(res, 'Item not found', 404);
      }

      const newQuantity = type === 'IN' 
        ? item.quantity + quantity 
        : type === 'OUT' 
          ? item.quantity - quantity 
          : quantity;

      if (newQuantity < 0) {
        return this.sendError(res, 'Insufficient stock', 400);
      }

      const [updatedItem, transaction] = await prisma.$transaction([
        prisma.inventoryItem.update({
          where: { id },
          data: { quantity: newQuantity }
        }),
        prisma.transaction.create({
          data: {
            type,
            quantity,
            itemId: id,
            userId,
            notes
          }
        })
      ]);

      return this.sendSuccess(res, { item: updatedItem, transaction }, 'Stock adjusted successfully');
    } catch (error) {
      return this.handleError(error, res);
    }
  }
} 