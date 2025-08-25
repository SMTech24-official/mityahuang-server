import { WhatsappContact } from "@prisma/client";
import prisma from "../../../../lib/utils/prisma.utils";

// ** get whatsapp contact
const getWhatsappContact = async () => {
  return await prisma.whatsappContact.findFirst();
};

// ** update whatsapp contact
const updateWhatsappContact = async (
  id: string,
  payload: Partial<WhatsappContact>,
) => {
  return await prisma.whatsappContact.update({
    where: { id },
    data: payload,
  });
};

export const whatsappContactRepository = {
  updateWhatsappContact,
  getWhatsappContact,
};
