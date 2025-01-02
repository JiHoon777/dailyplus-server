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

export interface IConfiguration {
  port: number
  env: string
  database: DatabaseConfig
  jwt: JwtConfig
}
