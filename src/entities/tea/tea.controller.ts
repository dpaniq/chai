import { Router } from "oak";
import { CreateTeaSchema, type Tea } from "./tea.schema.ts";

const router = new Router({ prefix: "/v1/tea" });

const tea: Tea[] = [];

router
  .get("/", (ctx) => {
    ctx.response.body = tea;
  })
  .post("/", async (ctx) => {
    const body = ctx.request.body({ type: "json" });
    const data = await body.value;

    const parsed = CreateTeaSchema.safeParse(data);
    if (!parsed.success) {
      ctx.response.status = 400;
      ctx.response.body = { error: parsed.error.format() };
      return;
    }

    const newTea: Tea = {
      id: crypto.randomUUID(),
      ...parsed.data,
    };
    tea.push(newTea);
    ctx.response.status = 201;
    ctx.response.body = newTea;
  });

export default router;
