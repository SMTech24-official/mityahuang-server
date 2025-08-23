import { ContactUs, ContactUsStatus } from "@prisma/client";
import prisma from "../../../../lib/utils/prisma.utils";

// ** create new contact us
const creteContactUs = async (payload: ContactUs) => {
  return await prisma.contactUs.create({
    data: payload,
  });
};

// ** get contact us
const getPaginatedContactUs = async (
  limit: number,
  skip: number,
  query: Record<string, any>,
) => {
  return await prisma.contactUs.findMany({
    take: limit,
    skip,
    orderBy: {
      cratedAt: "asc",
    },
  });
};

// ** search contact us
const searchContactUs = async (
  limit: number,
  skip: number,
  query: Record<string, any>,
  searchQuery: string,
) => {
  return await prisma.contactUs.findMany({
    take: limit,
    skip,
    where: {
      OR: [
        {
          // fullName: { contains: searchQuery, mode: "insensitive" },
          // email: { contains: searchQuery, mode: "insensitive" },
          message: { contains: searchQuery, mode: "insensitive" },
          // orderId: { contains: searchQuery, mode: "insensitive" },
        },
      ],
    },
  });
};

// ** get contact us by id
const getContactUsById = async (id: string) => {
  return await prisma.contactUs.findFirst({
    where: { id },
  });
};

// ** get contact us count
const getContactUsCount = async () => {
  return await prisma.contactUs.count();
};

// ** update contact us status
const updateContactUsStatus = async (id: string, status: ContactUsStatus) => {
  return await prisma.contactUs.update({
    where: { id },
    data: {
      status,
    },
  });
};

// ** delete contact us status
const deleteContactUs = async (id: string) => {
  return await prisma.contactUs.delete({
    where: { id },
  });
};

export const contactUsRepository = {
  getPaginatedContactUs,
  getContactUsCount,
  creteContactUs,
  searchContactUs,
  getContactUsById,
  updateContactUsStatus,
  deleteContactUs,
};
