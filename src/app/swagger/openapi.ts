import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import teaV1Registry from "../../entities/tea/v1/tea-v1.openapi.ts";
import teaV2Registry from "../../entities/tea/v2/tea-v2.openapi.ts";

const generator = new OpenApiGeneratorV3([
  ...teaV1Registry.definitions,
  ...teaV2Registry.definitions,
]);

export const openApiSpec = generator.generateDocument({
  openapi: "3.0.3",
  servers: [{ url: "http://localhost:8000/api" }],
  info: {
    title: "Tea API",
    version: "1.0.0",
  },
});
