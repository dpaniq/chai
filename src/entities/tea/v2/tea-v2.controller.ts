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
  .get("/", async (ctx) => {
    console.log(ctx);
    ctx.response.body = await teaV2Service.findAll();
  });

export default routerV2;
