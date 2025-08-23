import { Router } from "express";
import { contactUsController } from "../controller/contact-us.controller";
import sanitizeInputData from "../../../middleware/sanitizeClientDataViaZod";
import { contactUsValidation } from "../validation/contact-us.validation";

const router = Router();

// retrieve all contact-us
router.route("/").get(contactUsController.getAllContactUs);

// get contact us by id
router.route("/:id").get(contactUsController.getContactUsById);

// create new contact us
router
  .route("/")
  .post(
    sanitizeInputData(contactUsValidation.create),
    contactUsController.createNewContactUs,
  );

// update contact us status
router
  .route("/:id")
  .patch(
    sanitizeInputData(contactUsValidation.updateStatusSchema),
    contactUsController.updateContactUsStatus,
  );

// search contact us
router.route("/search").post(contactUsController.searchContactUs);

// search contact us
router.route("/:id").delete(contactUsController.deleteContactUs);
export const contactUsRoutes = router;
