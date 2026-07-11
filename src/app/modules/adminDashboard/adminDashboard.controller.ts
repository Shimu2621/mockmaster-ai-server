import { Request, Response } from 'express';
import { AdminDashboardServices } from './adminDashboard.services';
import httpStatus from 'http-status';
import catchAsync from '@/app/utils/catchAsync';

/**
 * Retrieve admin dashboard data.
 * Returns aggregated statistics and information required for the admin dashboard.
 */
const getAdminDashboardData = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminDashboardServices.getAdminDashboardData();

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Admin dashboard data fetched successfully',
    data: result,
  });
});

/**
 * Export all admin dashboard controllers.
 */
export const AdminDashboardController = {
  getAdminDashboardData,
};
