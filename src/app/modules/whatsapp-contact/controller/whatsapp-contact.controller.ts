import { HttpStatusCode } from "axios";
import asyncHandler from "../../../../lib/utils/async-handler";
import sendResponse from "../../../../lib/utils/sendResponse";
import { whatsappContactService } from "../service/whatsapp-contact.service";
import env from "../../../../config/clean-env";
import { getPublicImageUrlFromFile } from "../../../../lib/utils/get-public-image-url-from-file";

// ** get whatsapp contact
const getWhatsappContact = asyncHandler(async (req, res) => {
  const data = await whatsappContactService.getWhatsappContact();

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Retrieving whatsapp contact success",
    data,
  });
});

// ** get whatsapp contact
const updateWhatsappContact = asyncHandler(async (req, res) => {
  const file = req.file;
  let whatsappImageUrl;

  if (file) {
    const url = getPublicImageUrlFromFile(file);
    whatsappImageUrl = url;
  }

  const data = await whatsappContactService.updateWhatsappContact(
    req.body,
    whatsappImageUrl,
  );

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Retrieving whatsapp contact success",
    data,
  });
});

export const whatsappContactController = {
  getWhatsappContact,
  updateWhatsappContact,
};
