import { registerAs } from '@nestjs/config'
import { env } from 'process'

export const jwtConfigs = registerAs('jwt', () => ({
  secret: env.JWT_SECRET,
  audience: env.JWT_TOKEN_AUDIENCE,
  issuer: env.JWT_TOKEN_ISSUER,
  accessTokenTtl: parseInt(env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
  refreshTokenTtl: parseInt(env.JWT_REFRESH_TOKEN_TTL, 10),
}))
