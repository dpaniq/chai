import {
  OpenAPIRegistry,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { Client } from "@notionhq/client";
import { Application, Router } from "oak";
import { z as zod } from "zod";
import env from "./env.ts";

// OpenAPI registry to register all schemas across the app
export const registry = new OpenAPIRegistry();

// Zod
// Should be imported first to monkey patch zod with openapi
extendZodWithOpenApi(zod);
export const z = zod;

// Application
export const app = new Application();
export const router = new Router({ prefix: "/api" });

// Initializing a client
export const notionAPI = new Client({
  auth: env.NOTION_CHAI_TOKEN,
});
