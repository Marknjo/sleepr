import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '../config'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'default-db',
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
export class DatabaseModule {}
