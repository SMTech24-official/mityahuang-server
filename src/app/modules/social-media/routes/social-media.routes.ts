import { Router } from "express";
import { socialMediaController } from "../controller/social-media.controller";
import sanitizeInputData from "../../../middleware/sanitizeClientDataViaZod";
import { socialMediaValidation } from "../validation/social-media.validation";
import { multerUpload } from "../../../middleware/multer";

const router = Router();

// ** get all social media
router.route("/").get(socialMediaController.getAllSocialMedia);

// ** get social media by id
router.route("/:id").get(socialMediaController.getSocialMediaById);

// ** create new social media
router
  .route("/")
  .post(
    multerUpload("social-media").single("image"),
    sanitizeInputData(socialMediaValidation.newSocialMediaSchema),
    socialMediaController.createSocialMedia,
  );

// ** update social media
router
  .route("/:id")
  .patch(
    multerUpload("social-media").single("image"),
    sanitizeInputData(socialMediaValidation.updateSocialMediaSchema),
    socialMediaController.updateSocialMedia,
  );

// ** delete social media
router.route("/:id").delete(socialMediaController.deleteSocialMedia);

export const SocialMediaRoutes = router;
