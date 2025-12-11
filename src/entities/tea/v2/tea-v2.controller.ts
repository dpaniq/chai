import { Router } from "oak";
import { TeaV2Service } from "./tea-v2.service.ts";

const teaV2Service = new TeaV2Service();
const routerV2 = new Router({ prefix: "/v2/tea" });

routerV2
  .get("/database", async (ctx) => {
    ctx.response.body = await teaV2Service.getDatabase();
  })
  .get("/data-source", async (ctx) => {
    ctx.response.body = await teaV2Service.getDataSource();
  })
  .get("/data-source-query", async (ctx) => {
    console.log(ctx);
    ctx.response.body = await teaV2Service.getDataSourceQuery();
  })
  .get("/page/:id", async (ctx) => {
    const id = ctx.params.id!;
    ctx.response.body = await teaV2Service.findByPageId(id);
    console.info("OK");
  });
// .get("/:id", async (ctx) => {
//   const id = ctx.params.id!;
//   ctx.response.body = await teaV2Service.findById(id);
// });

export default routerV2;
