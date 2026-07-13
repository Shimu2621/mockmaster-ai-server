import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ReadingPassageServices } from './readingPassage.services';
import catchAsync from '@/app/utils/catchAsync';
import { ApiError } from '@/app/errors/apiError';

/**
 * Create a new reading passage.
 * Receives passage data from the request body and stores it in the database.
 */
const createReadingPassageController = catchAsync(async (req: Request, res: Response) => {
  const result = await ReadingPassageServices.createReadingPassage(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Reading passage created successfully',
    data: result,
  });
});

/**
 * Retrieve all reading passages.
 * Supports pagination and filters results by the authenticated user.
 */
const getAllReadingPassagesController = catchAsync(async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const options: { page?: number; limit?: number; userId?: string } = {};

  if (page) options.page = Number(page);
  if (limit) options.limit = Number(limit);
  if (req.user) {
    options.userId = req.user.id;
  }

  const result = await ReadingPassageServices.getAllReadingPassages(options);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Reading passages retrieved successfully',
    ...result,
  });
});

/**
 * Retrieve a single reading passage by its ID.
 */
const getSingleReadingPassageController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Reading Passage ID is required');
  }
  const result = await ReadingPassageServices.getSingleReadingPassage(id as string);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reading passage not found');
  }

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Reading passage retrieved successfully',
    data: result,
  });
});

/**
 * Update an existing reading passage by its ID.
 */
const updateReadingPassageController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Reading Passage ID is required');
  }
  const result = await ReadingPassageServices.updateReadingPassage(id as string, req.body);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Reading passage updated successfully',
    data: result,
  });
});

/**
 * Delete a reading passage by its ID.
 */
const deleteReadingPassageController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Reading Passage ID is required');
  }
  const result = await ReadingPassageServices.deleteReadingPassage(id as string);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Reading passage deleted successfully',
    data: result,
  });
});

export const ReadingPassageController = {
  createReadingPassageController,
  getAllReadingPassagesController,
  getSingleReadingPassageController,
  updateReadingPassageController,
  deleteReadingPassageController,
};
