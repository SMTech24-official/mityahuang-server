import { z } from "zod";
import { normalOrHiddenZodSchema } from "../../../../global-validation/validation";

const newServiceManagement = z.object({
  body: z.object({
    orderType: z.enum(["Product", "Parcel"]),
    typeOfCharge: z.enum([
      "Percentage_of_products_amount",
      "Fixed_amount_for_each_pcs",
    ]),
    service: z.string(),
    fee: z.number().positive().min(0),
    status: normalOrHiddenZodSchema,
  }),
});

const updateServiceManagement = z.object({
  body: z.object({
    orderType: z.enum(["Product", "Parcel"]).optional(),
    typeOfCharge: z
      .enum(["Percentage_of_products_amount", "Fixed_amount_for_each_pcs"])
      .optional(),
    service: z.string().optional(),
    fee: z.number().positive().min(0).optional(),
    status: normalOrHiddenZodSchema.optional(),
  }),
});

export const serviceManagementValidation = {
  newServiceManagement,
  updateServiceManagement,
};
