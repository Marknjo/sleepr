import { NestFactory } from '@nestjs/core'
import { ReservationsModule } from './reservations.module'
import { ValidationPipe } from '@nestjs/common'
import { Logger } from 'nestjs-pino'

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule)

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

  // logger
  app.useLogger(app.get(Logger))

  await app.listen(3000)
}
bootstrap()
