import { registry } from "../../singletones.ts";
import { CreateTeaSchema, TeaSchema } from "./tea.schema.ts";

// Register Zod models
registry.register("Tea", TeaSchema);
registry.register("CreateTea", CreateTeaSchema);

// Define endpoints
registry.registerPath({
  method: "get",
  path: "/v1/tea",
  summary: "List all tea",
  tags: ["Tea"],
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
            items: { $ref: "#/components/schemas/Tea" },
            uniqueItems: true,
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/v1/tea",
  summary: "Create a tea",
  tags: ["Tea"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CreateTea" },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Created tea",
      content: {
        "application/json": { schema: { $ref: "#/components/schemas/Tea" } },
      },
    },
  },
});

export default registry;
