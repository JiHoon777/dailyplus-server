interface DatabaseConfig {
  host: string
  port: number
  username: string
  password: string
  database: string
}

interface JwtConfig {
  secretKey: string
  secretExpiration: string
  refreshSecretKey: string
  refreshSecretExpiration: string
}
interface AiConfig {
  openaiApiKey: string
  perplexityApiKey: string
}

export interface IConfiguration {
  port: number
  env: string
  database: DatabaseConfig
  ai: AiConfig
  jwt: JwtConfig
}
