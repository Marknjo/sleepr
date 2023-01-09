import { NestFactory } from '@nestjs/core'
import { ReservationsModule } from './reservations.module'
import { ValidationPipe } from '@nestjs/common'

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

  await app.listen(3000)
}
bootstrap()
