import { Module } from '@nestjs/common'
import {
  AsyncModelFactory,
  ModelDefinition,
  MongooseModule,
} from '@nestjs/mongoose'
import { ConfigModule } from '../config'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const dbUri = config.get('DB_URI')

        return {
          uri: dbUri,
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models)
  }

  static forFeatureAsync(models: AsyncModelFactory[]) {
    return MongooseModule.forFeatureAsync(models)
  }
}
