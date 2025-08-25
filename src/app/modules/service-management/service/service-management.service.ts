import { ServiceManagement } from "@prisma/client";
import { I_PaginationResponse } from "../../../../interface/common.interface";
import { serviceManagementRepository } from "../repository/service-management.repository";
import { HttpStatusCode } from "axios";
import AppError from "../../../../errors/appError";

// ** get all service management
const getAllServiceManagements = async (query?: Record<string, any>) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = Number(page - 1) * limit || 0;

  // get total count of contact us
  const totalCount =
    await serviceManagementRepository.getServiceManagementCount();

  // calculate total page for pagination
  const totalPages = Math.ceil(totalCount / limit);

  const result = await serviceManagementRepository.getAllServiceManagements(
    limit,
    skip,
    query!,
  );

  const paginationSchema: I_PaginationResponse<ServiceManagement[]> = {
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

// ** get single service management
const getSingleServiceManagement = async (id: string) => {
  const serviceManagement =
    await serviceManagementRepository.getSingleServiceManagement(id);

  if (!serviceManagement) {
    throw new AppError(HttpStatusCode.NotFound, "Service Management not found");
  }

  return serviceManagement;
};

// ** create new service Management
const createNewServiceManagement = async (payload: ServiceManagement) => {
  return await serviceManagementRepository.createNewServiceManagement(payload);
};

// ** update new service Management
const updateServiceManagement = async (
  id: string,
  payload: ServiceManagement,
) => {
  const existedServiceManagement =
    await serviceManagementRepository.getSingleServiceManagement(id);

  if (!existedServiceManagement) {
    throw new AppError(HttpStatusCode.NotFound, "Service Management not found");
  }

  return await serviceManagementRepository.updateServiceManagement(id, payload);
};

// ** delete new service Management
const deleteServiceManagement = async (id: string) => {
  const existedServiceManagement =
    await serviceManagementRepository.getSingleServiceManagement(id);

  if (!existedServiceManagement) {
    throw new AppError(HttpStatusCode.NotFound, "Service Management not found");
  }

  return await serviceManagementRepository.deleteServiceManagement(id);
};

export const serviceManagementService = {
  getAllServiceManagements,
  getSingleServiceManagement,
  createNewServiceManagement,
  updateServiceManagement,
  deleteServiceManagement,
};
