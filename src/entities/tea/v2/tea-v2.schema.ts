import { z } from "zod";

export const TeaV2Schema = z
  .object({
    id: z.string().uuid().meta({ description: "UUID of tea" }),
    name: z.string().min(1).max(100).meta({ description: "Name of tea" }),
    type: z
      .enum(["black", "green", "white", "oolong", "herbal"])
      .meta({ description: "Type/category" }),
    origin: z
      .string()
      .optional()
      .meta({ description: "Origin country or region" }),
    caffeine: z.boolean().meta({ description: "Has caffeine or not" }),
  })
  .meta({ id: "Tea V2" });

export const CreateTeaV2Schema = TeaV2Schema.omit({ id: true }).meta({
  id: "CreateTeaV2",
});

// Типы из Zod
export type TeaV2 = z.infer<typeof TeaV2Schema>;
export type CreateTeaV2Dto = z.infer<typeof CreateTeaV2Schema>;
