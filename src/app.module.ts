import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticlesModule } from './articles'
import { AuthModule } from './auth/auth.module'
import configuration from './config/configuration'
import { QuotePersonsModule } from './quote-persons/quote-persons.module'
import { QuotesModule } from './quotes'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'dev',
      namingStrategy: new SnakeNamingStrategy(),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env[process.env.NODE_ENV],
      load: [configuration],
      cache: true,
    }),
    UsersModule,
    AuthModule,
    ArticlesModule,
    QuotesModule,
    QuotePersonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
