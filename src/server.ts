import { oakCors } from "cors";
import { send } from "oak";

// prettier-ignore
import { app, router } from "./singletones.ts";

import swaggerRouter from "./app/swagger/swagger.controller.ts";
import { PORT } from "./constants.ts";
import teaRouter from "./entities/tea/tea.controller.ts";

// Static file middleware
app.use(async (context, next) => {
  const path = context.request.url.pathname;
  console.log({ path });
  await next();
});

app.use(async (context, next) => {
  const path = context.request.url.pathname;

  try {
    await send(context, path, {
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  } catch {
    // not a static file -> continue to next middleware (or 404)
    await next();
  }
});

app.use(oakCors());

router.use(swaggerRouter.routes(), swaggerRouter.allowedMethods());
router.use(teaRouter.routes(), teaRouter.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`🚀 Server running at http://localhost:${PORT}`);
console.log(`📘 Swagger docs at http://localhost:${PORT}/swagger`);
console.log(`📘 Swagger OpenAPI at http://localhost:${PORT}/openapi.json`);
await app.listen({ port: PORT });
