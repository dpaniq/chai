import { fromFileUrl } from "https://deno.land/std@0.200.0/path/from_file_url.ts";
import { Router, send } from "oak";
import { openApiSpec } from "./openapi.ts";

const router = new Router();

router.get("/openapi.json", (ctx) => {
  ctx.response.type = "application/json";
  ctx.response.body = openApiSpec;
});

router.get("/swagger", async (ctx) => {
  // convert file URL to OS-native path to avoid leading-slash on Windows
  const publicDir = fromFileUrl(new URL("../../../public", import.meta.url));
  try {
    await send(ctx, "swagger.html", { root: publicDir, index: "swagger.html" });
  } catch (e) {
    console.log(e);

    ctx.response.status = 404;
    ctx.response.body = "Swagger docs not found";
  }
});

export default router;
