
Waste-Drop is a Vite + React + TypeScript frontend scaffold with TailwindCSS and a small Node backend in `waste_drop_backend/`.

This repository has been prepared for deployment to Vercel (static-build).

## Quick start (local)

1. Install dependencies

```powershell
cd 'E:\\weate drop\\Waste-Drop'
npm install
```

2. Start dev server

```powershell
npm run dev
# open http://localhost:8080
```

3. Build for production

```powershell
npm run build
# output is in ./dist
```

## Deployment (Vercel)

This project contains a `vercel.json` which configures Vercel's `@vercel/static-build` to run `npm run build` and serve the `dist` output. It also rewrites all routes to `/index.html` for SPA behavior.

To deploy:
- Push your changes to GitHub.
- In Vercel, import the repo and set the Project Root to the repository root.
- Vercel will run the static build and publish the site.

Or, with the Vercel CLI:

```powershell
npm i -g vercel
vercel login
vercel --prod
```

## Backend

There is a small backend under `waste_drop_backend/` which is currently not wired as Vercel serverless functions. If you want the backend deployed with the frontend on Vercel, we should move or expose the backend as API routes under an `api/` folder or create a separate repository/deployment for it.

## Notes

- `.gitignore` added. `node_modules` and `dist` are not tracked.
- Replaced `@vitejs/plugin-react-swc` with `@vitejs/plugin-react` to avoid native `@swc/core` binding issues on some environments.
- Node engine in `package.json` was relaxed to `>=18` to be compatible with Vercel's runtimes.

If you want, I can:
- Create a GitHub release or tag.
- Open a PR instead of direct pushing to `main`.
- Convert the backend into Vercel serverless functions.
