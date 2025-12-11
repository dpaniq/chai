import { z } from "zod";
import { TitleTextSchema } from "../../shared/schema.ts";

const UserRefSchema = z.object({
  object: z.literal("user"),
  id: z.uuid(),
});

const ParentDataSourceSchema = z.object({
  type: z.literal("data_source_id"),
  data_source_id: z.uuid(),
  database_id: z.uuid(),
});

const NumberPropertySchema = z.object({
  id: z.string(),
  type: z.literal("number"),
  number: z.number().nullable().optional(),
});

const SelectOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string().optional(),
});

const SelectPropertySchema = z.object({
  id: z.string(),
  type: z.literal("select"),
  select: SelectOptionSchema.nullable().optional(),
});

const MultiSelectPropertySchema = z.object({
  id: z.string(),
  type: z.literal("multi_select"),
  multi_select: z.array(SelectOptionSchema).optional(),
});

const CheckboxPropertySchema = z.object({
  id: z.string(),
  type: z.literal("checkbox"),
  checkbox: z.boolean(),
});

const RichTextPropertySchema = z.object({
  id: z.string(),
  type: z.literal("rich_text"),
  rich_text: z.array(TitleTextSchema).optional(),
});

const TitlePropertySchema = z.object({
  id: z.string(),
  type: z.literal("title"),
  title: z.array(TitleTextSchema).optional(),
});

const RelationPropertySchema = z.object({
  id: z.string(),
  type: z.literal("relation"),
  relation: z.array(z.any()).optional(),
  has_more: z.boolean().optional(),
});

// union of property value shapes that appear in page query results
const PagePropertySchema = z.union([
  NumberPropertySchema,
  SelectPropertySchema,
  MultiSelectPropertySchema,
  CheckboxPropertySchema,
  RichTextPropertySchema,
  TitlePropertySchema,
  RelationPropertySchema,
]);

const PropertiesRecord = z.record(
  z.enum([
    "Temperature",
    "Tea_base_color",
    "Tested",
    "Proliv duration",
    "Tea_types",
    "Tea_origin",
    "Tea_supplier",
    "Tea_name_meaning",
    "Assortment",
    "Tea_name",
  ]),
  PagePropertySchema
);

export const PageSchema = z.object({
  object: z.literal("page"),
  id: z.uuid(),
  created_time: z
    .string()
    .refine((s) => !isNaN(Date.parse(s)), { message: "Invalid ISO datetime" }),
  last_edited_time: z
    .string()
    .refine((s) => !isNaN(Date.parse(s)), { message: "Invalid ISO datetime" }),
  created_by: UserRefSchema,
  last_edited_by: UserRefSchema,
  cover: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  parent: ParentDataSourceSchema,
  archived: z.boolean(),
  in_trash: z.boolean(),
  is_locked: z.boolean().optional(),
  properties: PropertiesRecord,
  url: z.url(),
  public_url: z.url().nullable().optional(),
});

export const TeaDataSourceQuerySchema = z
  .object({
    object: z.literal("list").meta({ description: "Fixed object type 'list'" }),
    results: z.array(PageSchema).meta({ description: "List of page results" }),
    next_cursor: z.string().nullable().optional(),
    has_more: z.boolean(),
    type: z.literal("page_or_data_source"),
    page_or_data_source: z.object({}).optional(),
    request_id: z.string(),
  })
  .meta({
    id: "TeaDataSourceQuery",
    openapi: {
      title: "Tea DataSource Query",
      description:
        "Response schema for querying a tea data_source (pages list).",
    },
  });

export type Page = z.infer<typeof PageSchema>;
export type TeaDataSourceQuery = z.infer<typeof TeaDataSourceQuerySchema>;
