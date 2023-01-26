import { NestFactory } from '@nestjs/core'
import { ReservationsModule } from './reservations.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { Logger as LoggerPino } from 'nestjs-pino'
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule)

  // configs
  app.use(cookieParser())

  // validations
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
  app.useLogger(app.get(LoggerPino))

  // start app
  const configService = app.get(ConfigService)
  const port = configService.get('API_PORT')
  await app.listen(port)

  // log api default url
  const logger = new Logger('Reservations API', { timestamp: true })
  logger.log(`App running on http://localhost:${port}`)
}
bootstrap()
