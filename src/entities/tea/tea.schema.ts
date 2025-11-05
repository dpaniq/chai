import { z } from "zod";

export const TeaSchema = z
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
  .meta({ id: "Tea" });

export const CreateTeaSchema = TeaSchema.omit({ id: true }).meta({
  id: "CreateTea",
});

// Типы из Zod
export type Tea = z.infer<typeof TeaSchema>;
export type CreateTeaDto = z.infer<typeof CreateTeaSchema>;
