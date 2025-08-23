import { Router } from "express";
import { whatsappContactController } from "../controller/whatsapp-contact.controller";
import sanitizeInputData from "../../../middleware/sanitizeClientDataViaZod";
import { whatsappContactValidation } from "../validation/whatsapp-contact.validation";
import { multerUpload } from "../../../middleware/multer";

const router = Router();

// ** retrieve whatsapp contact data
router.route("/").get(whatsappContactController.getWhatsappContact);

// ** retrieve whatsapp contact data

router
  .route("/")
  .patch(
    multerUpload("whatsapp-contact-image").single("image"),
    sanitizeInputData(whatsappContactValidation.updateWhatsappContactSchema),
    whatsappContactController.updateWhatsappContact,
  );

export const whatsappContactRouter = router;
