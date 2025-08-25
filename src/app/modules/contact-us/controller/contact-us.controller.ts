import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../../../lib/utils/async-handler";
import sendResponse from "../../../../lib/utils/sendResponse";
import { contactUsService } from "../service/contact-us.service";
import AppError from "../../../../errors/appError";

// ** retrieve all contact us from db
const getAllContactUs = asyncHandler(async (req, res) => {
  const result = await contactUsService.getContactUsFromDb(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "All contact retrieved successfully",
    success: true,
    data: result,
  });
});

// ** create new contact us
const createNewContactUs = asyncHandler(async (req, res) => {
  const result = await contactUsService.creteContactUs(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Creating new contact us successful",
    success: true,
    data: result,
  });
});

// ** search all contact us from db
const searchContactUs = asyncHandler(async (req, res) => {
  const { searchQuery } = req.query;
  const result = await contactUsService.searchContactUsFromDb(
    searchQuery as string,
    req.query,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "All contact retrieved successfully",
    success: true,
    data: result,
  });
});

// ** get contact us by id
const getContactUsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await contactUsService.getContactUsById(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Gating contact us by id successful",
    success: true,
    data: result,
  });
});

// ** get contact us by id
const updateContactUsStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await contactUsService.updateContactUsStatus(id, status);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Update contact us success",
    success: true,
    data: result,
  });
});

// ** delete contact us by id
const deleteContactUs = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await contactUsService.deleteContactUs(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Update contact us success",
    success: true,
    data: null,
  });
});

export const contactUsController = {
  getAllContactUs,
  searchContactUs,
  createNewContactUs,
  getContactUsById,
  updateContactUsStatus,
  deleteContactUs,
};
