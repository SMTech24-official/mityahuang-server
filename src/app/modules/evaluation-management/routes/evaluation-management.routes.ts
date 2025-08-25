import { Router } from "express";
import { evaluationManagementController } from "../controller/evaluation-management.controller";
import sanitizeInputData from "../../../middleware/sanitizeClientDataViaZod";
import { evaluationManagementValidation } from "../validation/evaluation-management.validation";

const router = Router();

// ** get all Evaluation Managements
router
  .route("/")
  .get(evaluationManagementController.getAllEvaluationManagement);

// ** get Evaluation Management by id
router
  .route("/:id")
  .get(evaluationManagementController.getSingleEvaluationManagement);

// ** create Evaluation Management
router
  .route("/")
  .post(
    sanitizeInputData(
      evaluationManagementValidation.createNewEvaluationManagementSchema,
    ),
    evaluationManagementController.createNewEvaluationManagement,
  );

// ** update Evaluation Management
router
  .route("/:id")
  .patch(
    sanitizeInputData(
      evaluationManagementValidation.updateEvaluationManagementSchema,
    ),
    evaluationManagementController.updateEvaluationManagement,
  );

// ** delete Evaluation Management
router
  .route("/:id")
  .delete(evaluationManagementController.deleteEvaluationManagement);

export const EvaluationManagementRoutes = router;
