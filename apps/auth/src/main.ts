import { NestFactory } from '@nestjs/core'
import { AuthModule } from './auth.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { Logger as PinoLogger } from 'nestjs-pino'
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AuthModule)

  app.use(cookieParser())

  // add validations
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  // Pino logger setup
  app.useLogger(app.get(PinoLogger))

  // start app
  const configService = app.get(ConfigService)
  const port = configService.get('API_PORT')
  await app.listen(port)

  // log api default url
  const logger = new Logger('Auth API', { timestamp: true })
  logger.log(`App running on http://localhost:${port}`)
}
bootstrap()
