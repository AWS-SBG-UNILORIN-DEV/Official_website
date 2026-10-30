import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { config } from './config.js';
import { checkDatabaseConnection } from './db.js';
import { authRouter } from './routes/auth.routes.js';
import { errorHandler, notFoundHandler } from './utils/api-error.js';

export const app = express();

app.disable('x-powered-by');
app.set('trust proxy', config.trustProxyHops);
app.use(helmet());
app.use((req, res, next) => {
  const origin = req.get('origin');
  if (origin && !config.corsOrigins.includes(origin)) {
    return res.status(403).json({
      status: 'error',
      error: { code: 'FORBIDDEN_ORIGIN', message: 'Request origin is not allowed.' },
    });
  }
  return next();
});
app.use(cors({ origin: config.corsOrigins, credentials: true }));
app.get('/health', async (_req, res) => {
  try {
    await checkDatabaseConnection();
    return res.json({ status: 'ok' });
  } catch {
    return res.status(503).json({
      status: 'error',
      error: { code: 'DATABASE_UNAVAILABLE', message: 'Database is unavailable.' },
    });
  }
});

app.use(express.json({ limit: config.jsonBodyLimit, strict: true }));
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use(notFoundHandler);
app.use(errorHandler);
