import { NestFactory } from '@nestjs/core'
import { AuthModule } from './auth.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { Logger as PinoLogger } from 'nestjs-pino'
import { env } from 'process'

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

  // Pino logger setup
  app.useLogger(app.get(PinoLogger))

  // start app
  const port = env.API_PORT
  await app.listen(port)

  // log api default url
  const logger = new Logger('Auth API', { timestamp: true })
  logger.log(`App running on http://localhost:${port}`)
}
bootstrap()
