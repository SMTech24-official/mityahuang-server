import { HttpStatusCode } from "axios";
import asyncHandler from "../../../../lib/utils/async-handler";
import sendResponse from "../../../../lib/utils/sendResponse";
import { socialMediaService } from "../service/social-media.service";

// ** get all social media
const getAllSocialMedia = asyncHandler(async (req, res) => {
  const result = await socialMediaService.getAllSocialMedia(req.query);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Getting social media success",
    data: result,
  });
});

// ** get social media by id
const getSocialMediaById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await socialMediaService.getSocialMediaById(id);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Getting social media by id success",
    data,
  });
});

// ** create new social media
const createSocialMedia = asyncHandler(async (req, res) => {
  const file = req.file as Express.Multer.File;

  const data = await socialMediaService.createSocialMedia(req.body, file);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Creating new social media success",
    data,
  });
});

// ** update social media
const updateSocialMedia = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const file = req.file as Express.Multer.File;
  const data = await socialMediaService.updateSocialMedia(id, req.body, file);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Updating social media success",
    data,
  });
});

// ** delete social media
const deleteSocialMedia = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await socialMediaService.deleteSocialMedia(id);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Deleting social media success",
    data: null,
  });
});

export const socialMediaController = {
  getSocialMediaById,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
  getAllSocialMedia,
};
