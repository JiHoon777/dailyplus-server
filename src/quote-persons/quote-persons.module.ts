import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { QuotePerson } from './quote-person.entity'
import { QuotePersonsController } from './quote-persons.controller'
import { QuotePersonsService } from './quote-persons.service'

@Module({
  imports: [TypeOrmModule.forFeature([QuotePerson])],
  providers: [QuotePersonsService],
  controllers: [QuotePersonsController],
})
export class QuotePersonsModule {}
