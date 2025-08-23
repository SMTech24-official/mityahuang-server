import { z } from "zod";

const PHONE_NUMBER_REGEX =
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

const newContactUsSchema = z.object({
  body: z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phoneNumber: z.string().regex(PHONE_NUMBER_REGEX, "Invalid phone number"),
    orderId: z.string(),
    message: z.string().min(4, "Enter minimum 6 character message"),
  }),
});

const updateStatusSchema = z.object({
  body: z.object({
    status: z.enum(["Read", "Replied", "Unread"]),
  }),
});

export const contactUsValidation = {
  create: newContactUsSchema,
  updateStatusSchema,
};
