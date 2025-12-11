import { registry } from "../../../singletones.ts";
import {
  PageSchema,
  TeaDatabaseSchema,
  TeaDataSourceQuerySchema,
  TeaDataSourceSchema,
} from "./schema/index.ts";

// Register Zod models
registry.register("TeaDatabaseV1", TeaDatabaseSchema);
registry.register("TeaDataSourceV1", TeaDataSourceSchema);
registry.register("TeaDataSourceQueryV1", TeaDataSourceQuerySchema);
registry.register("PageSchema", PageSchema);

// Define endpoints
registry.registerPath({
  method: "get",
  path: "/v1/tea/database",
  summary: "Info about tea DB",
  tags: ["Tea"],
  operationId: "getTeaDataBaseV1",
  // deprecated: true,
  description: "Retrieve a database info",
  responses: {
    200: {
      description: "Tea Database V1 ",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/TeaDatabaseV1",
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/v1/tea/data-source",
  summary: "Info about tea Data Source",
  tags: ["Tea"],
  operationId: "getTeaDataSourceV1",
  // deprecated: true,
  description: "Retrieve a data source info",
  responses: {
    200: {
      description: "Tea Data Source V1 ",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/TeaDataSourceV1",
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/v1/tea/data-source-query",
  summary: "Info about tea Data Source Query",
  tags: ["Tea"],
  operationId: "getTeaDataSourceQueryV1",
  // deprecated: true,
  description: "Retrieve a data source query",
  responses: {
    200: {
      description: "Tea Data Source Query V1 ",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/TeaDataSourceQueryV1",
            type: "object",
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/v1/tea/page/{id}",
  summary: "Get tea by page ID",
  tags: ["Tea"],
  operationId: "getTeaById",
  deprecated: false,
  description: "Retrieve a tea item page ID",
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
          schema: { $ref: "#/components/schemas/PageSchema", type: "object" },
        },
      },
    },
  },
});

export default registry;
