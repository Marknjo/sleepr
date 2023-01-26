import { NestFactory } from '@nestjs/core'
import { AuthModule } from './auth.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { Logger as PinoLogger } from 'nestjs-pino'
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'
import { Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(AuthModule)

  // configs
  const configService = app.get(ConfigService)

  app.use(cookieParser())

  // setup microservices

  const tcpPort = configService.get('TCP_PORT')
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: tcpPort,
    },
  })

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

  const apiPort = configService.get('API_PORT')
  await app.listen(apiPort)

  // start microservices
  await app.startAllMicroservices()

  // log api default url
  const logger = new Logger('Auth API', { timestamp: true })
  logger.log(`App running on http://localhost:${tcpPort}`)
}
bootstrap()
