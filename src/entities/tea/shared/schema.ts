import { z } from "../../../singletones.ts";

export const TitleTextSchema = z.object({
  type: z.string(),
  text: z.object({
    content: z.string(),
    link: z.nullable(z.any()).optional(),
  }),
  annotations: z.object({
    bold: z.boolean(),
    italic: z.boolean(),
    strikethrough: z.boolean(),
    underline: z.boolean(),
    code: z.boolean(),
    color: z.string(),
  }),
  plain_text: z.string(),
  href: z.nullable(z.string()).optional(),
});
