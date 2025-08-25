import { WhatsappContact } from "@prisma/client";
import { whatsappContactRepository } from "../repository/whatsapp-contact.repository";
import AppError from "../../../../errors/appError";
import { StatusCodes } from "http-status-codes";

// ** get getWhatsappContact
const getWhatsappContact = async () => {
  return await whatsappContactRepository.getWhatsappContact();
};

// ** update whatsapp contact
const updateWhatsappContact = async (
  payload: Partial<WhatsappContact>,
  whatsappImageUrl?: string,
) => {
  const whatsappContact = await whatsappContactRepository.getWhatsappContact();

  if (!whatsappContact) {
    throw new AppError(StatusCodes.NOT_FOUND, "No whatsapp contact found");
  }

  return await whatsappContactRepository.updateWhatsappContact(
    whatsappContact?.id as string,
    { ...payload, imageUrl: whatsappImageUrl ?? whatsappContact.imageUrl },
  );
};

export const whatsappContactService = {
  getWhatsappContact,
  updateWhatsappContact,
};
