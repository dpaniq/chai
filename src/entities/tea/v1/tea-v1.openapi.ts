import { registry } from "../../../singletones.ts";
import {
  TeaDatabaseSchema,
  TeaDataSourceQuerySchema,
  TeaDataSourceSchema,
} from "./schema/index.ts";

// Register Zod models
registry.register("TeaDatabaseV1", TeaDatabaseSchema);
registry.register("TeaDataSourceV1", TeaDataSourceSchema);
registry.register("TeaDataSourceQueryV1", TeaDataSourceQuerySchema);

// Define endpoints
registry.registerPath({
  method: "get",
  path: "/v1/tea/database",
  summary: "Info about tea DB",
  tags: ["Tea"],
  operationId: "getTeaDataBaseV1",
  deprecated: true,
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
  deprecated: true,
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
  deprecated: true,
  description: "Retrieve a data source query",
  responses: {
    200: {
      description: "Tea Data Source Query V1 ",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/TeaDataSourceQueryV1",
          },
        },
      },
    },
  },
});

export default registry;
