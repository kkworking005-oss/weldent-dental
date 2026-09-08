# Weldent Dental Clinic

A modern, responsive website for Weldent Dental Clinic in Bengaluru, built with React, TanStack Start, TypeScript, Tailwind CSS, and Vite.

## Development

Install dependencies and start the local development server:

```sh
bun install
bun run dev
```

## Production build

```sh
bun run build
```

The production output is generated in `.output`:

- Worker entry: `.output/server/index.mjs`
- Static assets: `.output/public`

## Deploy to Cloudflare Workers

Authenticate once with `bunx wrangler login`, then deploy:

```sh
bun run deploy
```

Nitro generates the final Wrangler deployment configuration during the build.
