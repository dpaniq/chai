// ...existing code...
import { z } from "zod";
import { TitleTextSchema } from "../../shared/schema.ts";

// ...existing code...

const ParentPageSchema = z.object({
  type: z.literal("page_id"),
  page_id: z.uuid(),
});

// Added: lightweight ref for items inside the database object
const DataSourceRefSchema = z.object({
  id: z.uuid().meta({ description: "UUID of the data source" }),
  name: z.string().meta({ description: "Display name of the data source" }),
});

// New: TeaDatabaseSchema matching provided example object
export const TeaDatabaseSchema = z
  .object({
    object: z.literal("database").meta({ description: "Fixed object type" }),
    id: z.uuid().meta({ description: "UUID of the database" }),
    title: z
      .array(TitleTextSchema)
      .meta({ description: "Database title blocks" }),
    description: z
      .array(z.any())
      .optional()
      .meta({ description: "Rich description blocks" }),
    parent: ParentPageSchema.meta({ description: "Parent page reference" }),
    is_inline: z.boolean().meta({ description: "Is inline flag" }),
    in_trash: z.boolean().meta({ description: "In trash flag" }),
    is_locked: z.boolean().meta({ description: "Is locked flag" }),
    created_time: z
      .string()
      .refine((s) => !isNaN(Date.parse(s)), { message: "Invalid ISO datetime" })
      .meta({ description: "Creation time (ISO 8601)" }),
    last_edited_time: z
      .string()
      .refine((s) => !isNaN(Date.parse(s)), { message: "Invalid ISO datetime" })
      .meta({ description: "Last edited time (ISO 8601)" }),
    data_sources: z.array(DataSourceRefSchema).optional().meta({
      description: "Associated data sources (id + name)",
    }),
    icon: z
      .string()
      .nullable()
      .optional()
      .meta({ description: "Icon URL or null" }),
    cover: z
      .string()
      .nullable()
      .optional()
      .meta({ description: "Cover URL or null" }),
    url: z.url().meta({ description: "Public Notion URL" }),
    public_url: z
      .url()
      .nullable()
      .optional()
      .meta({ description: "Public URL or null" }),
    request_id: z.string().meta({ description: "Request identifier" }),
  })
  .meta({
    id: "TeaDatabase",
    openapi: {
      title: "Tea Database",
      description:
        "Schema representing a tea database (from Notion-like export).",
    },
  });

export type TeaDatabase = z.infer<typeof TeaDatabaseSchema>;
