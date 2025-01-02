import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { QuotePerson } from '@/quotePersons'

@Entity()
export class Quote {
  @Index()
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  originalText: string

  @Column('text')
  koreanText: string

  @ManyToOne(() => QuotePerson)
  @JoinColumn({ name: 'quote_person_id' })
  quotePerson: QuotePerson

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
