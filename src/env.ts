import * as envalid from "envalid";

const env = envalid.cleanEnv(Deno.env.toObject(), {
  DEBUG: envalid.bool({ default: false }),
  NOTION_CHAI_TOKEN: envalid.str(Deno.env.get("NOTION_CHAI_TOKEN") as any),
});

export default env;
