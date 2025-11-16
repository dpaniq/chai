import { Router } from "oak";
import routerV1 from "./v1/tea-v1.controller.ts";
import routerV2 from "./v2/tea-v2.controller.ts";

const router = new Router();

router.use(routerV1.routes(), routerV1.allowedMethods());
router.use(routerV2.routes(), routerV2.allowedMethods());

export default router;
