import type { IConfiguration } from './configuration.interface'

export default (): IConfiguration => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  env: process.env.NODE_ENV,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    secretExpiration: process.env.JWT_SECRET_EXPIRATION,
    refreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY,
    refreshSecretExpiration: process.env.JWT_REFRESH_SECRET_EXPIRATION,
  },
  ai: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    perplexityApiKey: process.env.PERPLEXITY_API_KEY,
  },
})
