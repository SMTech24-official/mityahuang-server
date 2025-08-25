import { FAQ } from "@prisma/client";
import prisma from "../../../../lib/utils/prisma.utils";

// ** get all faq
const getAllFAQ = async () => {
  return await prisma.fAQ.findMany();
};

// ** get single FAQ
const getSingleFAQ = async (id: string) => {
  return await prisma.fAQ.findUnique({
    where: { id },
  });
};

// ** create FAQ
const createFAQ = async (payload: FAQ) => {
  return await prisma.fAQ.create({
    data: payload,
  });
};

// ** update faq
const updateFAQ = async (id: string, payload: FAQ) => {
  return await prisma.fAQ.update({
    where: { id },
    data: payload,
  });
};

// ** delete faq
const deleteFAQ = async (id: string) => {
  return await prisma.fAQ.delete({
    where: { id },
  });
};

export const faqRepository = {
  getAllFAQ,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getSingleFAQ,
};
