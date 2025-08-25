import { SocialMedia } from "@prisma/client";
import { socialMediaRepository } from "../repository/social-media.repository";
import AppError from "../../../../errors/appError";
import { HttpStatusCode } from "axios";
import constructUrlAndImageUploaderUtil from "../../../../lib/utils/constructCloudinaryUrlAndUploadImage";
import { deleteFileByUrl } from "../../../../lib/utils/unlinkExistingFile";
import { I_PaginationResponse } from "../../../../interface/common.interface";

// ** get all social media
const getAllSocialMedia = async (query?: Record<string, any>) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = Number(page - 1) * limit || 0;

  // get total count of contact us
  const totalCount = await socialMediaRepository.getSocialMediaCount();

  // calculate total page for pagination
  const totalPages = Math.ceil(totalCount / limit);

  const result = await socialMediaRepository.getAllSocialMedia(
    limit,
    skip,
    query!,
  );

  const paginationSchema: I_PaginationResponse<SocialMedia[]> = {
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

// ** get social media by id
const getSocialMediaById = async (id: string) => {
  const socialMediaExist = await socialMediaRepository.getSocialMediaById(id);

  if (!socialMediaExist) {
    throw new AppError(HttpStatusCode.NotFound, "Social media not found");
  }
  return await socialMediaRepository.getSocialMediaById(id);
};

// ** create new social media
const createSocialMedia = async (
  payload: SocialMedia,
  file: Express.Multer.File,
) => {
  if (!file) {
    throw new AppError(HttpStatusCode.NotAcceptable, "Image file not provided");
  }

  const imageUrl = await constructUrlAndImageUploaderUtil(file, "social-media");

  return await socialMediaRepository.createSocialMedia({
    ...payload,
    imageUrl,
  });
};

// ** update social media
const updateSocialMedia = async (
  id: string,
  payload: Partial<SocialMedia>,
  file: Express.Multer.File,
) => {
  const socialMediaExist = await socialMediaRepository.getSocialMediaById(id);

  if (!socialMediaExist) {
    throw new AppError(HttpStatusCode.NotFound, "Social media not found");
  }

  let socialMediaUrl;

  if (file) {
    const url = await constructUrlAndImageUploaderUtil(file, "social-media");

    // delete old file
    await deleteFileByUrl(socialMediaExist.imageUrl);

    socialMediaUrl = url;
  }

  return await socialMediaRepository.updateSocialMedia(id, {
    ...payload,
    imageUrl: socialMediaUrl || socialMediaExist.imageUrl,
  });
};

// ** delete social media
const deleteSocialMedia = async (id: string) => {
  const socialMediaExist = await socialMediaRepository.getSocialMediaById(id);

  if (!socialMediaExist) {
    throw new AppError(HttpStatusCode.NotFound, "Social media not found");
  }

  // delete old file
  await deleteFileByUrl(socialMediaExist.imageUrl);

  return await socialMediaRepository.deleteSocialMedia(id);
};

export const socialMediaService = {
  getAllSocialMedia,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
  getSocialMediaById,
};
