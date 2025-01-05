import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'

import { QuotePerson } from '@/quote-persons'
import { BaseEntity } from '@/shared/entities'

@Entity()
export class Quote extends BaseEntity {
  @Index()
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  originalText: string

  @Column('text')
  koreanText: string

  @Column('int')
  quotePersonId: number

  @ManyToOne(() => QuotePerson)
  @JoinColumn({ name: 'quote_person_id' })
  quotePerson: QuotePerson
}
