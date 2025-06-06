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
    console.error('Error:', error);
    return this.sendError(res, error.message || 'Internal server error', error.statusCode || 500);
  }
} 