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
  path: "/v2/tea",
  summary: "List all tea",
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
            items: { $ref: "#/components/schemas/Tea V2" },
            uniqueItems: true,
          },
        },
      },
    },
  },
});

export default registry;
