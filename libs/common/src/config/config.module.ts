import { Module } from '@nestjs/common'
import {
  ConfigFactory,
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config'
import validationSchema from '../utils/envs.config'

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env.dev'],
      validationSchema: validationSchema(),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {
  static forFeature(configs: ConfigFactory) {
    return NestConfigModule.forFeature(configs)
  }
}
