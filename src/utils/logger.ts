import pino from 'pino';

// Next.js環境に最適化されたロガー設定
export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  browser: {
    asObject: true,
    serialize: true,
  },
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

// 汎用的な成功ログ
export const logInfo = (message: string, data?: Record<string, unknown>) => {
  logger.info(data || {}, message);
};

// 汎用的なエラーログ
export const logError = (message: string, error?: Error, data?: Record<string, unknown>) => {
  logger.error(
    {
      error: error?.message,
      ...data,
    },
    message
  );
};

// 汎用的なデバッグログ
export const logDebug = (message: string, data?: Record<string, unknown>) => {
  logger.debug(data || {}, message);
};
