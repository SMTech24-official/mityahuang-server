import { z } from "zod";
import { normalOrHiddenZodSchema } from "../../../../global-validation/validation";

const newSocialMediaSchema = z.object({
  body: z.object({
    link: z.string().min(3),
    status: normalOrHiddenZodSchema.optional(),
  }),
});

const updateSocialMediaSchema = z.object({
  body: z.object({
    link: z.string().min(3).optional(),
    status: normalOrHiddenZodSchema.optional(),
  }),
});

export const socialMediaValidation = {
  newSocialMediaSchema,
  updateSocialMediaSchema,
};
