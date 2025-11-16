// ...existing code...
import { z } from "zod";
import { TitleTextSchema } from "../../shared/schema.ts";

const OptionSchema = z.object({
  id: z.string().meta({ description: "Option id" }),
  name: z.string().meta({ description: "Option display name" }),
  color: z.string().optional().meta({ description: "Option color token" }),
  description: z
    .string()
    .nullable()
    .optional()
    .meta({ description: "Option description" }),
});

const SelectSchema = z.object({
  id: z.string().meta({ description: "Property id" }),
  name: z.string().meta({ description: "Property name" }),
  description: z.string().nullable().optional(),
  type: z.literal("select"),
  select: z.object({
    options: z.array(OptionSchema),
  }),
});

const MultiSelectSchema = SelectSchema.extend({
  type: z.literal("multi_select"),
  multi_select: z.object({ options: z.array(OptionSchema) }),
});

const NumberPropertySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  type: z.literal("number"),
  number: z.object({ format: z.string().optional() }).optional(),
});

const CheckboxSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  type: z.literal("checkbox"),
  checkbox: z.object({}).optional(),
});

const RichTextSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  type: z.literal("rich_text"),
  rich_text: z.object({}).optional(),
});

const TitlePropertySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  type: z.literal("title"),
  title: z.object({}).optional(),
});

// Generic property union (covers number, select, multi_select, checkbox, rich_text, title)
const PropertySchema = z.union([
  NumberPropertySchema,
  SelectSchema,
  MultiSelectSchema,
  CheckboxSchema,
  RichTextSchema,
  TitlePropertySchema,
]);

const UserRefSchema = z.object({
  object: z.literal("user"),
  id: z.uuid(),
});

const ParentDatabaseSchema = z.object({
  type: z.literal("database_id"),
  database_id: z.uuid(),
});

const ParentPageSchema = z.object({
  type: z.literal("page_id"),
  page_id: z.uuid(),
});

export const TeaDataSourceSchema = z
  .object({
    object: z.literal("data_source").meta({ description: "Fixed object type" }),
    id: z.uuid().meta({ description: "UUID of the data source" }),
    cover: z
      .string()
      .nullable()
      .optional()
      .meta({ description: "Cover URL or null" }),
    icon: z
      .string()
      .nullable()
      .optional()
      .meta({ description: "Icon URL or null" }),
    created_time: z
      .string()
      .refine((s) => !isNaN(Date.parse(s)), { message: "Invalid ISO datetime" })
      .meta({ description: "Creation time (ISO 8601)" }),
    created_by: UserRefSchema.meta({
      description: "Reference to creating user",
    }),
    last_edited_by: UserRefSchema.meta({
      description: "Reference to last editor",
    }),
    last_edited_time: z
      .string()
      .refine((s) => !isNaN(Date.parse(s)), { message: "Invalid ISO datetime" })
      .meta({ description: "Last edited time (ISO 8601)" }),
    title: z.array(TitleTextSchema).meta({ description: "Page title blocks" }),
    description: z
      .array(z.any())
      .optional()
      .meta({ description: "Rich description blocks" }),
    is_inline: z.boolean().meta({ description: "Is inline flag" }),
    properties: z.record(z.string(), PropertySchema).meta({
      description:
        "Map of property name -> property definition (number/select/multi_select/checkbox/rich_text/title)",
    }),
    parent: ParentDatabaseSchema.meta({
      description: "Parent database reference",
    }),
    database_parent: ParentPageSchema.meta({
      description: "Database parent page reference",
    }),
    url: z.url().meta({ description: "Public Notion URL" }),
    public_url: z
      .url()
      .nullable()
      .optional()
      .meta({ description: "Public URL or null" }),
    archived: z.boolean().meta({ description: "Archived flag" }),
    in_trash: z.boolean().meta({ description: "In trash flag" }),
    request_id: z.string().meta({ description: "Request identifier" }),
  })
  .meta({
    id: "TeaDataSource",
    openapi: {
      title: "Tea DataSource",
      description:
        "Schema representing a tea data_source page (from Notion-like export).",
    },
  });

export type TeaDataSource = z.infer<typeof TeaDataSourceSchema>;
