import { NestFactory } from '@nestjs/core'
import { PaymentsModule } from './payments.module'
import { ConfigService } from '@nestjs/config'
import { Transport } from '@nestjs/microservices'
import { Logger, ValidationPipe } from '@nestjs/common'
import { Logger as PinoLogger } from 'nestjs-pino'

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule)
  const config = app.get(ConfigService)

  // setup validations
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  // connect microservices
  const port = config.get('TCP_PORT')
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: config.get('TCP_HOST'),
      port,
    },
  })

  // start microservice
  await app.startAllMicroservices()

  // logger
  app.useLogger(app.get(PinoLogger))

  const logger = new Logger('APP')
  logger.log(`Microservices running on port ${port}`)
}
bootstrap()
