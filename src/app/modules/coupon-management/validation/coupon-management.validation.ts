import { z } from "zod";
import { normalOrHiddenZodSchema } from "../../../../global-validation/validation";

const newCouponSchema = z.object({
  body: z.object({
    couponName: z.string().min(1),
    promoCode: z.string().min(1),
    couponType: z.enum(["Full_Reduction", "Discount"]),
    couponUse: z.enum(["All", "Order", "Waybill"]),
    fullAmount: z.number().positive().min(0),
    discount: z.number().positive().min(0),
    total: z.number().positive().min(0),
    maximumAmount: z.number().positive().min(0),
    startingTime: z.coerce.date(),
    endingTime: z.coerce.date(),
    validityPeriodDays: z.number().positive().min(0),
    status: normalOrHiddenZodSchema,
  }),
});

const updateCouponSchema = z.object({
  body: z.object({
    couponName: z.string().min(1).optional(),
    promoCode: z.string().min(1).optional(),
    couponType: z.enum(["Full_Reduction", "Discount"]).optional(),
    couponUse: z.enum(["All", "Order", "Waybill"]).optional(),
    fullAmount: z.number().positive().min(0).optional(),
    discount: z.number().positive().min(0).optional(),
    total: z.number().positive().min(0).optional(),
    maximumAmount: z.number().positive().min(0).optional(),
    startingTime: z.coerce.date().optional(),
    endingTime: z.coerce.date().optional(),
    validityPeriodDays: z.number().positive().min(0).optional(),
    status: normalOrHiddenZodSchema.optional(),
  }),
});

export const couponManagementValidation = {
  newCouponSchema,
  updateCouponSchema,
};
