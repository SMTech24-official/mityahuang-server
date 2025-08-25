import { Router } from "express";
import { helpCenterInfoController } from "../controller/help-center.controller";
import sanitizeInputData from "../../../middleware/sanitizeClientDataViaZod";
import { helpCenterInfoValidator } from "../validation/help-center.validation";

const router = Router();

// ** get help center info
router.route("/").get(helpCenterInfoController.getHelpCenterInfo);

// ** update help center info
router
  .route("/")
  .patch(
    sanitizeInputData(helpCenterInfoValidator.updateHelpCenterInfoSchema),
    helpCenterInfoController.updateHelpCenterInfo,
  );

export const HelpCenterRoutes = router;
