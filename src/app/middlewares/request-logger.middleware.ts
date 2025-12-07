import { Context } from "oak";

// /c:/Users/bogda/Documents/github/chai/src/app/middlewares/log.middleware.ts

export type LogLevel = "info" | "warn" | "error" | "debug";

export interface LogOptions {
  logger?: (level: LogLevel, msg: string) => void;
  redactHeaders?: string[]; // header names to redact (case-insensitive)
  showHeaders?: boolean; // include request headers in log
  showResponseSize?: boolean; // include response content-length if available
}

const defaultLogger = (level: LogLevel, msg: string) => {
  const out = `[${new Date().toISOString()}] ${level.toUpperCase()} ${msg}`;
  if (level === "error" || level === "warn") console.error(out);
  else console.info(out);
};

const redact = (headers: Headers, toRedact: string[] = []) => {
  if (!toRedact.length) return Object.fromEntries(headers as any);
  const redacted: Record<string, string> = {};
  for (const [k, v] of headers as any) {
    redacted[k] = toRedact.includes(k.toLowerCase()) ? "<redacted>" : v;
  }
  return redacted;
};

export function requestLogger(opts: LogOptions = {}) {
  const logger = opts.logger ?? defaultLogger;
  const redactList = (opts.redactHeaders ?? []).map((h) => h.toLowerCase());

  return async (ctx: Context, next: () => Promise<unknown>) => {
    const req = ctx.request;
    const start = Date.now();

    // Basic request metadata
    const method = req.method;
    const url = req.url.toString();
    const remoteAddr =
      ctx.request.ip ?? ctx.request.headers.get("x-forwarded-for") ?? "-";

    // Log request start
    try {
      const headerInfo = opts.showHeaders
        ? ` headers=${JSON.stringify(redact(req.headers, redactList))}`
        : "";
      logger("info", `--> ${method} ${url} from=${remoteAddr}${headerInfo}`);

      await next();

      const ms = Date.now() - start;
      const status = ctx.response.status ?? 200;
      const size = opts.showResponseSize
        ? ` size=${ctx.response.headers.get("content-length") ?? "-"}`
        : "";

      logger(
        status >= 500 ? "error" : status >= 400 ? "warn" : "info",
        `<-- ${method} ${url} ${status} ${ms}ms from=${remoteAddr}${size}`
      );
    } catch (err) {
      const ms = Date.now() - start;
      const status = ctx.response.status ?? 500;
      logger(
        "error",
        `<-- ${method} ${url} ${status} ${ms}ms from=${remoteAddr} error=${
          (err && (err as any).message) || String(err)
        }`
      );
      // keep original behavior: rethrow so upstream handlers / Oak can handle
      throw err;
    }
  };
}
