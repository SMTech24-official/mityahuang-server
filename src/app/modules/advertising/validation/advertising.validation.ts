import { z } from "zod";

const updateAdvertisingSchema = z.object({
  body: z.object({
    link: z.string().min(2).optional(),
    textSize: z.coerce.number().positive().min(0).optional(),
  }),
});

export const advertisingValidation = {
  updateAdvertisingSchema,
};
