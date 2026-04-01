# FermiAmericaIsCorrupt.io

Interactive entity-relationship intelligence map for investigating Fermi America / Project Matador. Built with React and Vite, structured for multi-network support.

## Local Development

```bash
npm install
npm run dev          # starts dev server on localhost:5173
npm test             # runs vitest test suite
npm run build        # production build to dist/fermi/
```

Set `NETWORK=fermi` (or another network name) to switch datasets:

```bash
NETWORK=fermi npm run dev
```

## Adding a New Network

1. Create a new directory under `networks/<name>/` with four JSON files:
   - `node-data.json` — entity definitions (label, sub, category, flag, sections)
   - `edges.json` — array of `{ source, target, label, type }` connections
   - `node-sources.json` — cited sources per node ID
   - `theme.json` — colors, labels, weights, layout positions, zone labels

2. Add `<name>` to the matrix in `.github/workflows/build.yml`:
   ```yaml
   matrix:
     network: [fermi, <name>]
   ```

3. Run `NETWORK=<name> npm run dev` to preview locally, then push.

## CI/CD Pipeline

On push to `main` or `modular-architecture`:
- GitHub Actions checks out code, installs dependencies, runs tests, and builds
- Matrix strategy builds each network independently
- On `main`, deploys `dist/<network>` to GitHub Pages at `/<network>/` using `peaceiris/actions-gh-pages@v4`
