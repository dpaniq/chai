# chai

This repository contains a small Deno HTTP server example (Oak) that exposes a Tea CRUD API.

Key artifacts added by this change:

- `server.ts` - Oak-based HTTP server exposing REST endpoints under `/api/tea`.
- `public/swagger.html` - Swagger UI page mounted at `/docs` (fetches `/openapi.json`).
- `src/openapi.ts` - Uses `@asteasolutions/zod-to-openapi` to generate OpenAPI from the Zod schemas in `schemas/tea.schema.ts`.
- `deno.json` - new task `start:oak` to run the Oak server.
- `tsconfig.json` - updated with Deno-friendly TypeScript compiler options.

How to run (Oak server):

1. Start the Oak server (reads `PORT` from env, default 8080):

```powershell
deno task start:oak
```

2. Open the API docs in your browser:

http://localhost:8080/docs

3. Swagger JSON (OpenAPI):

http://localhost:8080/openapi.json
