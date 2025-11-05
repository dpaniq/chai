import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import teaRegistry from "../../entities/tea/tea.openapi.ts";

const generator = new OpenApiGeneratorV3(teaRegistry.definitions);

export const openApiSpec = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Tea API",
    version: "1.0.0",
  },
});
