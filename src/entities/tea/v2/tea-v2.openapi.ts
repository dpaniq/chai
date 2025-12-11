import { registry } from "../../../singletones.ts";
import { CreateTeaV2Schema, TeaV2Schema } from "./tea-v2.schema.ts";

// Register Zod models
registry.register("Tea V2", TeaV2Schema);
registry.register("CreateTea V2", CreateTeaV2Schema);

// Define endpoints
registry.registerPath({
  method: "get",
  path: "/v2/tea/database",
  summary: "Info about tea DB",
  tags: ["Tea V2"],
  operationId: "getTeaIinfo",
  deprecated: false,
  description: "Retrieve a database info",
  responses: {
    200: {
      description: "Array of tea",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Tea V2" },
            uniqueItems: true,
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/v2/tea/data-source",
  summary: "Info about tea DB",
  tags: ["Tea V2"],
  operationId: "getTeaIinfo",
  deprecated: false,
  description: "Retrieve a data source info",
  responses: {
    200: {
      description: "Array of tea",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/TeaDataSourceV1" },
            uniqueItems: true,
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/v2/tea/data-source-query",
  summary: "Info about tea Data Source Query",
  tags: ["Tea V2"],
  operationId: "getTea",
  deprecated: false,
  description: "Retrieve a list of all tea items",
  responses: {
    200: {
      description: "Array of tea",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/TeaDataSourceQueryV1" },
            uniqueItems: true,
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/v2/tea/page/{id}",
  summary: "Get tea by page ID",
  tags: ["Tea V2"],
  operationId: "getTeaById",
  deprecated: false,
  description: "Retrieve a tea item by page ID",
  parameters: [
    {
      in: "path",
      name: "id",
      required: true,
      schema: { type: "string" },
      description: "page_id",
    },
  ],
  responses: {
    200: {
      description: "A tea page item",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/PageSchema" },
        },
      },
    },
  },
});

export default registry;
