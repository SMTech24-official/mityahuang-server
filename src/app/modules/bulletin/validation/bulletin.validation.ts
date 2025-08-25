import { z } from "zod";
import { normalOrHiddenZodSchema } from "../../../../global-validation/validation";

const createNewBulletinSchema = z.object({
  body: z.object({
    date: z.coerce.date(),
    eventName: z.string().min(2),
    status: normalOrHiddenZodSchema,
  }),
});

const updateBulletinSchema = z.object({
  body: z.object({
    date: z.coerce.date().optional(),
    eventName: z.string().min(2).optional(),
    status: normalOrHiddenZodSchema.optional(),
  }),
});

export const bulletinValidation = {
  createNewBulletinSchema,
  updateBulletinSchema,
};
