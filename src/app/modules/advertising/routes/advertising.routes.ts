import { Router } from "express";
import { advertisingController } from "../controller/advertising.controller";
import { multerUpload } from "../../../middleware/multer";
import sanitizeInputData from "../../../middleware/sanitizeClientDataViaZod";
import { advertisingValidation } from "../validation/advertising.validation";

const router = Router();

// ** get advertising
router.route("/").get(advertisingController.getAdvertising);

// ** update advertising
router
  .route("/")
  .patch(
    multerUpload("advertising").single("image"),
    sanitizeInputData(advertisingValidation.updateAdvertisingSchema),
    advertisingController.updateAdvertising,
  );

export const AdvertisingRoutes = router;
