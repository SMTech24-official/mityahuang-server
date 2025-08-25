import { Advertising } from "@prisma/client";
import { advertisingRepository } from "../repository/advertising.repository";
import AppError from "../../../../errors/appError";
import { HttpStatusCode } from "axios";
import constructUrlAndImageUploaderUtil from "../../../../lib/utils/constructCloudinaryUrlAndUploadImage";

// ** get Advertising
const getAdvertising = async () => {
  return await advertisingRepository.getAdvertising();
};

// ** update advertising
const updateAdvertising = async (
  payload: Partial<Advertising>,
  file: Express.Multer.File,
) => {
  const advertising = await advertisingRepository.getAdvertising();

  if (!advertising) {
    throw new AppError(HttpStatusCode.NotFound, "No advertising found");
  }

  let advertisingImageUrl;

  if (file) {
    const url = await constructUrlAndImageUploaderUtil(file, "advertising");
    advertisingImageUrl = url;
  }

  return advertisingRepository.updateAdvertising(advertising.id, {
    ...payload,
    advertisingImageUrl: advertisingImageUrl || advertising.advertisingImageUrl,
    textSize: payload.textSize ? +payload.textSize : advertising.textSize,
  });
};

export const advertisingService = {
  getAdvertising,
  updateAdvertising,
};
