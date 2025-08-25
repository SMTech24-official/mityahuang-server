import { Advertising } from "@prisma/client";
import prisma from "../../../../lib/utils/prisma.utils";

// ** get advertising
const getAdvertising = async () => {
  return await prisma.advertising.findFirst();
};

// ** update Advertising
const updateAdvertising = async (id: string, payload: Partial<Advertising>) => {
  return await prisma.advertising.update({
    where: { id },
    data: payload,
  });
};

export const advertisingRepository = {
  getAdvertising,
  updateAdvertising,
};
