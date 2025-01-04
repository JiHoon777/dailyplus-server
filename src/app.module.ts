import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

import { AiModule } from './ai'
import { AiStoriesModule } from './ai-stories'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticlesModule } from './articles'
import { AuthModule } from './auth'
import configuration from './config/configuration'
import { LoggerMiddleware } from './middleware'
import { QuoteAiInterpretationsModule } from './quote-ai-interpretations'
import { QuotePersonsModule } from './quote-persons'
import { QuotesModule } from './quotes'
import { UsersModule } from './users'

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
    QuoteAiInterpretationsModule,
    AiStoriesModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*') // 모든 라우트에 적용
  }
}
