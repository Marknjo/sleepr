import { Module } from '@nestjs/common'
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config'
import validationSchema from '../utils/envs.config'

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
