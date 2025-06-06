import { Request, Response } from 'express';

export class BaseController {
  protected sendSuccess(res: Response, data: any, message: string = 'Success', statusCode: number = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  protected sendError(res: Response, message: string = 'Error', statusCode: number = 400) {
    return res.status(statusCode).json({
      success: false,
      message
    });
  }

  protected handleError(error: any, res: Response) {
    if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development") console.error('Error:', error);
    const message = !error.message || error.message.includes("prisma") ? "Internal server error" : error.message;
    return this.sendError(res, message, error.statusCode || 500);
  }
} 