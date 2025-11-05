import {
  OpenAPIRegistry,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { Application, Router } from "oak";
import { z as zod } from "zod";

// OpenAPI registry to register all schemas across the app
export const registry = new OpenAPIRegistry();

// Zod
// Should be imported first to monkey patch zod with openapi
extendZodWithOpenApi(zod);
export const z = zod;

// Application
export const app = new Application();
export const router = new Router({ prefix: "/api" });
