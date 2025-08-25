import { z } from "zod";
import { normalOrHiddenZodSchema } from "../../../../global-validation/validation";

const createNewEvaluationManagementSchema = z.object({
  body: z.object({
    memberId: z.string(),
    score: z.number().positive().min(1).max(5),
    evaluation: z.string(),
    evaluationData: z.coerce.date(),
    status: normalOrHiddenZodSchema,
  }),
});

const updateEvaluationManagementSchema = z.object({
  body: z.object({
    memberId: z.string().optional(),
    score: z.number().positive().min(1).max(5).optional(),
    evaluation: z.string().optional(),
    evaluationData: z.coerce.date().optional(),
    status: normalOrHiddenZodSchema.optional(),
  }),
});

export const evaluationManagementValidation = {
  createNewEvaluationManagementSchema,
  updateEvaluationManagementSchema,
};
