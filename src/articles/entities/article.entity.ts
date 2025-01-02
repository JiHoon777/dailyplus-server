import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { ArticleType } from '../enums/article-type.enum'

@Entity()
export class Article {
  @Index()
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  title: string

  @Column('text')
  summary: string

  @Index()
  @Column({
    type: 'enum',
    enum: ArticleType,
  })
  type: ArticleType

  @Index()
  @Column('date')
  publishedAt: Date

  @Column('text')
  referenceUrl: string

  @Column('text')
  referenceName: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
