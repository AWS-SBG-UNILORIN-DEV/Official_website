import { config } from './config.js';
import { closeDatabase } from './db.js';
import { app } from './app.js';

const server = app.listen(config.port, () => {
  console.log(`Authentication API listening on port ${config.port}`);
});

async function shutdown(signal) {
  console.log(`${signal} received; closing API server.`);
  server.close(async () => {
    await closeDatabase();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
