import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter'
import { TransformInterceptor } from './shared/interceptors/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useLogger(['error', 'warn', 'log', 'debug', 'verbose'])
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.use(cookieParser())

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
