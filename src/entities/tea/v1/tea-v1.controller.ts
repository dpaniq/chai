import { Router } from "oak";
import { TeaV1Service } from "./tea-v1.service.ts";

const teaV1Service = new TeaV1Service();
const routerV1 = new Router({ prefix: "/v1/tea" });

routerV1
  .get("/database", async (ctx) => {
    ctx.response.body = await teaV1Service.getDatabase();
  })
  .get("/data-source", async (ctx) => {
    ctx.response.body = await teaV1Service.getDataSource();
  })
  .get("/data-source-query", async (ctx) => {
    ctx.response.body = await teaV1Service.getDataSourceQuery();
  })
  .get("/page/:id", async (ctx) => {
    const id = ctx.params.id!;
    ctx.response.body = await teaV1Service.findByPageId(id);
  })
  .get("/:id", async (ctx) => {
    const id = ctx.params.id!;
    ctx.response.body = await teaV1Service.findById(id);
  });

export default routerV1;
