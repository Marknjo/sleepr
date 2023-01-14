import { NestFactory } from '@nestjs/core'
import { AuthModule } from './auth.module'
import { ValidationPipe } from '@nestjs/common'
import { Logger } from 'nestjs-pino'

async function bootstrap() {
  const app = await NestFactory.create(AuthModule)

  // add validations
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      transformOptions: {
        excludeExtraneousValues: true,
      },
    }),
  )

  // add pino logger

  app.useLogger(app.get(Logger))

  await app.listen(3001)
}
bootstrap()
