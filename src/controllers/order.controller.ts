import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { prisma } from '../lib/prisma';
import { Prisma, OrderStatus } from '@prisma/client';

export class OrderController extends BaseController {
  async createOrder(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const { items, notes } = req.body;

      // Calculate total amount
      const totalAmount = items.reduce((sum: number, item: any) => {
        return sum + (item.quantity * item.unitPrice);
      }, 0);

      const order = await prisma.order.create({
        data: {
          userId,
          totalAmount,
          notes,
          items: {
            create: items.map((item: any) => ({
              itemId: item.itemId,
              quantity: item.quantity,
              unitPrice: item.unitPrice
            }))
          }
        },
        include: {
          items: {
            include: {
              item: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      return this.sendSuccess(res, order, 'Order created successfully');
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async getOrders(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, status } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const where: Prisma.OrderWhereInput = {
        ...(status && { status: status as OrderStatus })
      };

      const [orders, total] = await Promise.all([
        prisma.order.findMany({
          where,
          include: {
            items: {
              include: {
                item: true
              }
            },
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          },
          skip,
          take: Number(limit),
          orderBy: { createdAt: 'desc' }
        }),
        prisma.order.count({ where })
      ]);

      return this.sendSuccess(res, {
        orders,
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

  async getOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const order = await prisma.order.findUnique({
        where: { id },
        include: {
          items: {
            include: {
              item: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      if (!order) {
        return this.sendError(res, 'Order not found', 404);
      }

      return this.sendSuccess(res, order);
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async updateOrderStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const order = await prisma.order.update({
        where: { id },
        data: { status },
        include: {
          items: {
            include: {
              item: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      // If order is completed, update inventory
      if (status === 'COMPLETED') {
        await Promise.all(
          order.items.map(async (orderItem) => {
            await prisma.inventoryItem.update({
              where: { id: orderItem.itemId },
              data: {
                quantity: {
                  decrement: orderItem.quantity
                }
              }
            });
          })
        );
      }

      return this.sendSuccess(res, order, 'Order status updated successfully');
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async cancelOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const order = await prisma.order.update({
        where: { id },
        data: { status: 'CANCELLED' },
        include: {
          items: {
            include: {
              item: true
            }
          }
        }
      });

      return this.sendSuccess(res, order, 'Order cancelled successfully');
    } catch (error) {
      return this.handleError(error, res);
    }
  }
} 