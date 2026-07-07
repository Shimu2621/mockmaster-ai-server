import { Request, Response } from 'express';

import { UserServices } from './user.services';
import httpStatus from 'http-status';
import catchAsync from '@/app/utils/catchAsync';
import { User } from '@prisma/client';

/**
 * Register a new user.
 */
const createUserController = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUser(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

/**
 * Authenticate a user and return login information.
 */
const loginUserController = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.loginUser(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

/**
 * Retrieve a paginated list of users with optional filters.
 */
const getAllUsersController = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, id, name, email } = req.query;
  const options: { page?: number; limit?: number; id?: string; name?: string; email?: string } = {};

  if (page) options.page = Number(page);
  if (limit) options.limit = Number(limit);
  if (id) options.id = id as string;
  if (name) options.name = name as string;
  if (email) options.email = email as string;

  const result = await UserServices.getAllUsers(options);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Users retrieved successfully',
    ...result,
  });
});

/**
 * Update a user's role (Admin only).
 */
const changeUserRoleController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!id) {
    return;
  }

  const result = await UserServices.changeUserRole(id, role);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'User role updated successfully',
    data: result,
  });
});

/**
 * Retrieve the authenticated user's profile.
 */
const getProfileController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user as User;

  const result = await UserServices.getProfile(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

/**
 * Update the authenticated user's profile.
 */
const editProfileController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user as User;
  const result = await UserServices.editProfile(id, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

/**
 * Allow the authenticated user to reset their password.
 */
const resetPasswordController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user as User;
  const { oldPassword, newPassword } = req.body;

  await UserServices.resetPassword(id, oldPassword, newPassword);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Password reset successfully',
  });
});

export const UserController = {
  createUserController,
  loginUserController,
  getAllUsersController,
  changeUserRoleController,
  getProfileController,
  editProfileController,
  resetPasswordController,
};
