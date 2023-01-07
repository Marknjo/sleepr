import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import validationSchema from '../utils/envs.config'

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
