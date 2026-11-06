export class ApiError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function asyncHandler(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

export function errorHandler(error, _req, res, _next) {
  if (res.headersSent) return;

  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({
      status: 'error',
      error: { code: 'VALIDATION_ERROR', message: 'Invalid JSON request body.' },
    });
  }

  if (!(error instanceof ApiError)) {
    console.error('Unhandled API error:', error.message);
  }

  const status = error.status ?? 500;
  const body = {
    status: 'error',
    error: {
      code: error.code ?? 'SERVER_ERROR',
      message: error.status ? error.message : 'Something went wrong. Please try again.',
    },
  };
  if (error.details?.length) body.error.details = error.details;
  return res.status(status).json(body);
}

export function notFoundHandler(_req, res) {
  return res.status(404).json({
    status: 'error',
    error: { code: 'NOT_FOUND', message: 'Route not found.' },
  });
}
