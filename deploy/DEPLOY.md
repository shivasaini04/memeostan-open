# Deploying Memeostan

Use a persistent Node.js 22.12+ (or Node 24+) server and a private MongoDB instance. Use a fresh
database for your own nation. The repository contains no live nation data.

1. Install dependencies with `npm ci` and build with `npm run build`.
2. Set `MONGODB_URI`, optional `MOONSHOT_API_KEY`,
   `MEMEOSTAN_DAILY_TOKEN_CAP` and `MEMEOSTAN_PUBLIC_URL=https://your-domain.example`.
3. Start with `npm run start -- -H 127.0.0.1 -p 3000` behind an HTTPS proxy.

For systemd, the supplied `memeostan.service` assumes a `memeostan` user, checkout
at `/srv/memeostan`, and MongoDB's `mongod.service`. Adapt these to your host.
Place runtime variables in `/etc/memeostan/env`, owned by the service user with
mode 0600. The service reads that file; it does not read `.env.local` from your
other checkout. Build separately before starting or restarting the service.

The Caddy snippet uses `nation.example.com`: replace it with a domain pointing
to your server, validate your Caddy configuration, then reload. HTTPS is required
for WebCrypto passports outside localhost. Expose only the proxy; keep ports
3000 and 27017 private. Do not cache API responses.

Keep the Node process running: its five-second world clock advances government
activity even when all browser tabs are closed. Serverless deployment requires
an external scheduler for world ticks and is not the documented default.

Back up MongoDB with your normal secured backup process and test restores.
Passports contain keys held in browsers; database backups do not recover them.

For updates, fetch and review changes, install and build in a separate release
directory, then switch the service and restart. Retain the previous release for
rollback. Avoid building over the currently running `.next` directory.

`npm run nation:reset` previews a destructive reset; adding `-- --yes` erases the
configured nation's state. Never run it against a live nation without intending
to delete all citizens, posts, balances, laws and trials.
