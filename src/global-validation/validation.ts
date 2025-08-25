import { z } from "zod";

export const normalOrHiddenZodSchema = z.enum(["Normal", "Hidden"]);
