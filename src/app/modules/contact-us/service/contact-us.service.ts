import { ContactUs, ContactUsStatus } from "@prisma/client";
import { contactUsRepository } from "../repository/contact-us.repository";
import { I_PaginationResponse } from "../../../../interface/common.interface";
import AppError from "../../../../errors/appError";
import { StatusCodes } from "http-status-codes";

// ** retrieve all contact us from db
const getContactUsFromDb = async (query?: Record<string, any>) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = Number(page - 1) * limit || 0;

  // get total count of contact us
  const totalCount = await contactUsRepository.getContactUsCount();

  // calculate total page for pagination
  const totalPages = Math.ceil(totalCount / limit);

  const result = await contactUsRepository.getPaginatedContactUs(
    limit,
    skip,
    query!,
  );

  const paginationSchema: I_PaginationResponse<ContactUs[]> = {
    meta: {
      totalCount,
      totalPages,
      page,
      limit,
    },
    result,
  };

  return paginationSchema;
};

// ** retrieve all contact us from db
const searchContactUsFromDb = async (
  searchQuery: string,
  query?: Record<string, any>,
) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = Number(page - 1) * limit || 0;

  console.log(skip);

  // get total count of contact us
  const totalCount = await contactUsRepository.getContactUsCount();

  // calculate total page for pagination
  const totalPages = Math.ceil(totalCount / limit);

  const result = await contactUsRepository.searchContactUs(
    limit,
    skip,
    query!,
    searchQuery,
  );

  const paginationSchema: I_PaginationResponse<ContactUs[]> = {
    meta: {
      totalCount,
      totalPages,
      page,
      limit,
    },
    result,
  };

  return paginationSchema;
};

// ** insert new const us into db
const creteContactUs = async (payload: ContactUs) => {
  return await contactUsRepository.creteContactUs(payload);
};

// ** get contact us by id from db
const getContactUsById = async (id: string) => {
  const result = await contactUsRepository.getContactUsById(id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Contact us not found");
  }

  return result;
};

// ** update contact us status
const updateContactUsStatus = async (id: string, status: ContactUsStatus) => {
  const contactUs = await contactUsRepository.getContactUsById(id);
  if (!contactUs) {
    throw new AppError(StatusCodes.NOT_FOUND, "Contact us not found");
  }

  const result = await contactUsRepository.updateContactUsStatus(id, status);

  return result;
};

// ** delete contact us
const deleteContactUs = async (id: string) => {
  const contactUs = await contactUsRepository.getContactUsById(id);
  if (!contactUs) {
    throw new AppError(StatusCodes.NOT_FOUND, "Contact us not found");
  }

  const result = await contactUsRepository.deleteContactUs(id);

  return result;
};

export const contactUsService = {
  getContactUsFromDb,
  creteContactUs,
  searchContactUsFromDb,
  getContactUsById,
  updateContactUsStatus,
  deleteContactUs,
};
