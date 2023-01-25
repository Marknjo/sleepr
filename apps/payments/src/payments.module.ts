import { Module } from '@nestjs/common'
import { PaymentsController } from './payments.controller'
import { PaymentsService } from './payments.service'
import { ConfigModule } from '@nestjs/config'
import validationSchema from './utils/env.utils'
import { PinoLoggerModule } from '@app/common'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      validationSchema: validationSchema(),
    }),
    PinoLoggerModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
