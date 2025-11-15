# chai

This repository contains a small Deno HTTP server example (Oak) that exposes a Tea CRUD API.

Key artifacts added by this change:

- `server.ts` - Oak-based HTTP server exposing REST endpoints under `/api/tea`.
- `public/swagger.html` - Swagger UI page mounted at `/api/swagger` (fetches `/openapi.json`).
- `src/openapi.ts` - Uses `@asteasolutions/zod-to-openapi` to generate OpenAPI from the Zod schemas in `schemas/tea.schema.ts`.
- `deno.json` - new task `deno task start` to run the server.

How to run server:

1. Start the Oak server (reads `PORT` from env, default 8000):

```terminal
deno task start
```

2. Open the API docs in your browser:

http://localhost:8000/api
http://localhost:8000/api/swagger
http://localhost:8000/api/openapi.json
