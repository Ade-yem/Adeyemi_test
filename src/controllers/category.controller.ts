import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { prisma } from '../lib/prisma';

export class CategoryController extends BaseController {
  async createCategory(req: Request, res: Response) {
    try {
      const { name, description } = req.body;

      const category = await prisma.category.create({
        data: {
          name,
          description
        }
      });

      return this.sendSuccess(res, category, 'Category created successfully');
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async getCategories(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany({
        include: {
          _count: {
            select: {
              items: true
            }
          }
        },
        orderBy: {
          name: 'asc'
        }
      });

      return this.sendSuccess(res, categories);
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async getCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          items: {
            where: {
              isArchived: false
            }
          }
        }
      });

      if (!category) {
        return this.sendError(res, 'Category not found', 404);
      }

      return this.sendSuccess(res, category);
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const category = await prisma.category.update({
        where: { id },
        data: {
          name,
          description
        }
      });

      return this.sendSuccess(res, category, 'Category updated successfully');
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if category has items
      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              items: true
            }
          }
        }
      });

      if (!category) {
        return this.sendError(res, 'Category not found', 404);
      }

      if (category._count.items > 0) {
        return this.sendError(res, 'Cannot delete category with existing items', 400);
      }

      await prisma.category.delete({
        where: { id }
      });

      return this.sendSuccess(res, null, 'Category deleted successfully');
    } catch (error) {
      return this.handleError(error, res);
    }
  }
} 